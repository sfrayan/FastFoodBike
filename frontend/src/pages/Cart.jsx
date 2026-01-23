import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { formatCurrency } from '../utils/helpers';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    const savedRestaurant = localStorage.getItem('cartRestaurant');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedRestaurant) {
      setRestaurant(JSON.parse(savedRestaurant));
    }
  }, []);

  const saveCart = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  const updateQuantity = (itemId, quantity) => {
    const updated = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const removeItem = (itemId) => {
    const updated = cartItems.filter((item) => item._id !== itemId);
    saveCart(updated);
  };

  const applyCoupon = () => {
    // Simple coupon logic - SAVE20 = 20% off
    if (couponCode === 'SAVE20') {
      setDiscount(0.2);
    } else if (couponCode === 'SAVE10') {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const deliveryFee = restaurant?.deliveryFee || 0;
  const tax = (subtotal - discountAmount) * 0.05;
  const total = subtotal - discountAmount + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-6xl mb-4">🛒</p>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some delicious food to get started!</p>
            <button onClick={() => navigate('/restaurants')} className="btn btn-primary">
              Browse Restaurants
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                {restaurant && (
                  <div className="mb-6 pb-6 border-b">
                    <h2 className="font-bold text-lg mb-2">From: {restaurant.name}</h2>
                    <p className="text-gray-600 text-sm">{restaurant.address}</p>
                  </div>
                )}

                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 mb-6 pb-6 border-b last:border-b-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">₹{item.price}</p>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border rounded"
                        />
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-bold mb-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Coupon */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="form-control mb-2"
                  />
                  <button onClick={applyCoupon} className="btn btn-secondary w-full">
                    Apply Coupon
                  </button>
                </div>

                {/* Bill Details */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({Math.round(discount * 100)}%):</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%):</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn btn-primary w-full mb-2"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate('/restaurants')}
                  className="btn btn-outline w-full"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
