import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../../services/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

/**
 * Stripe Card Payment Form
 */
function StripePaymentForm({ orderId, amount, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Create payment intent
      const intentResponse = await api.post('/payments/stripe/create-intent', {
        orderId,
        amount,
        customerEmail: localStorage.getItem('userEmail'),
      });

      if (intentResponse.data.status === 'error') {
        setError(intentResponse.data.message);
        onError?.(intentResponse.data.message);
        return;
      }

      const { clientSecret } = intentResponse.data.data;

      // Confirm payment with card
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        onError?.(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Payment successful
        await api.post('/payments/stripe/confirm', {
          paymentIntentId: result.paymentIntent.id,
          orderId,
        });
        onSuccess?.(result.paymentIntent.id);
      }
    } catch (err) {
      setError(err.message || 'Payment failed');
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Card Details</label>
        <div className="border rounded-lg p-4 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="text-red-600 mb-4 p-3 bg-red-50 rounded">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary w-full"
      >
        {loading ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

/**
 * Razorpay Payment Gateway
 */
function RazorpayPaymentForm({ orderId, amount, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create Razorpay order
      const orderResponse = await api.post('/payments/razorpay/create-order', {
        orderId,
        amount,
      });

      if (orderResponse.data.status === 'error') {
        setError(orderResponse.data.message);
        onError?.(orderResponse.data.message);
        return;
      }

      const { orderId: razorpayOrderId, keyId } = orderResponse.data.data;

      const options = {
        key: keyId,
        amount: Math.round(amount * 100), // in paise
        currency: 'INR',
        name: 'FastFoodBike',
        description: `Order #${orderId}`,
        image: '/logo.png',
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await api.post('/payments/razorpay/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId,
            });

            if (verifyResponse.data.status === 'success') {
              onSuccess?.(response.razorpay_payment_id);
            } else {
              onError?.(verifyResponse.data.message);
            }
          } catch (err) {
            onError?.(err.message);
          }
        },
        prefill: {
          name: localStorage.getItem('userName') || '',
          email: localStorage.getItem('userEmail') || '',
          contact: localStorage.getItem('userPhone') || '',
        },
        theme: {
          color: '#3b82f6',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.message || 'Payment failed');
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="text-red-600 mb-4 p-3 bg-red-50 rounded">{error}</div>}

      <button
        onClick={handleRazorpayPayment}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? 'Processing...' : `Pay ₹${amount.toFixed(2)} with Razorpay`}
      </button>
    </div>
  );
}

/**
 * Main Payment Gateway Component
 */
export default function PaymentGateway({ orderId, amount, onSuccess, onError }) {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">💳 Payment</h2>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Select Payment Method</label>
        <div className="space-y-2">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            style={{
              borderColor: paymentMethod === 'razorpay' ? '#3b82f6' : '#e5e7eb',
              backgroundColor: paymentMethod === 'razorpay' ? '#eff6ff' : 'transparent',
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div>
              <p className="font-semibold">🇮🇳 Razorpay</p>
              <p className="text-sm text-gray-600">UPI, Cards, Wallets</p>
            </div>
          </label>

          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            style={{
              borderColor: paymentMethod === 'stripe' ? '#3b82f6' : '#e5e7eb',
              backgroundColor: paymentMethod === 'stripe' ? '#eff6ff' : 'transparent',
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div>
              <p className="font-semibold">💳 Stripe</p>
              <p className="text-sm text-gray-600">International Cards</p>
            </div>
          </label>

          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            style={{
              borderColor: paymentMethod === 'cod' ? '#3b82f6' : '#e5e7eb',
              backgroundColor: paymentMethod === 'cod' ? '#eff6ff' : 'transparent',
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div>
              <p className="font-semibold">🏠 Cash on Delivery</p>
              <p className="text-sm text-gray-600">Pay when order arrives</p>
            </div>
          </label>
        </div>
      </div>

      {/* Payment Form */}
      <div className="border-t pt-6">
        {paymentMethod === 'razorpay' && (
          <RazorpayPaymentForm
            orderId={orderId}
            amount={amount}
            onSuccess={onSuccess}
            onError={onError}
          />
        )}

        {paymentMethod === 'stripe' && (
          <Elements stripe={stripePromise}>
            <StripePaymentForm
              orderId={orderId}
              amount={amount}
              onSuccess={onSuccess}
              onError={onError}
            />
          </Elements>
        )}

        {paymentMethod === 'cod' && (
          <div>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
              <p className="text-blue-700">
                ✓ You'll pay <strong>₹{amount.toFixed(2)}</strong> when your order arrives
              </p>
            </div>
            <button
              onClick={() => onSuccess?.('cod')}
              className="btn btn-primary w-full"
            >
              Confirm Order - Pay on Delivery
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
