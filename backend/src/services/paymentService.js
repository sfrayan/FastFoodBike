import Stripe from 'stripe';
import Razorpay from 'razorpay';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Stripe Payment Service
 */
export const stripeService = {
  /**
   * Create payment intent for Stripe
   */
  createPaymentIntent: async (amount, currency = 'inr', metadata = {}) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to paise
        currency,
        metadata,
        receipt_email: metadata.customerEmail,
      });
      return {
        status: 'success',
        data: {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  },

  /**
   * Confirm payment intent
   */
  confirmPayment: async (paymentIntentId) => {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return {
        status: 'success',
        data: {
          status: paymentIntent.status,
          amount: paymentIntent.amount / 100,
          charges: paymentIntent.charges,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  },

  /**
   * Handle Stripe webhook
   */
  handleWebhook: async (event) => {
    try {
      const signature = event.headers['stripe-signature'];
      const body = event.body;

      const stripeEvent = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      switch (stripeEvent.type) {
        case 'payment_intent.succeeded':
          return {
            type: 'payment_succeeded',
            data: stripeEvent.data.object,
          };
        case 'payment_intent.payment_failed':
          return {
            type: 'payment_failed',
            data: stripeEvent.data.object,
          };
        case 'charge.refunded':
          return {
            type: 'payment_refunded',
            data: stripeEvent.data.object,
          };
        default:
          return null;
      }
    } catch (error) {
      console.error('Webhook error:', error);
      return null;
    }
  },

  /**
   * Refund payment
   */
  refundPayment: async (chargeId, amount = null) => {
    try {
      const refund = await stripe.refunds.create({
        charge: chargeId,
        amount: amount ? Math.round(amount * 100) : undefined,
      });
      return {
        status: 'success',
        data: {
          refundId: refund.id,
          amount: refund.amount / 100,
          status: refund.status,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  },
};

/**
 * Razorpay Payment Service
 */
export const razorpayService = {
  /**
   * Create Razorpay order
   */
  createOrder: async (amount, currency = 'INR', receipt = '', notes = {}) => {
    try {
      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // Convert to paise
        currency,
        receipt,
        notes,
      });
      return {
        status: 'success',
        data: {
          orderId: order.id,
          amount: order.amount / 100,
          currency: order.currency,
          status: order.status,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  },

  /**
   * Verify Razorpay payment
   */
  verifyPayment: async (orderId, paymentId, signature) => {
    try {
      const crypto = require('crypto');
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      hmac.update(`${orderId}|${paymentId}`);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature === signature) {
        // Fetch payment details
        const payment = await razorpay.payments.fetch(paymentId);
        return {
          status: 'success',
          verified: true,
          data: {
            paymentId: payment.id,
            amount: payment.amount / 100,
            currency: payment.currency,
            status: payment.status,
          },
        };
      } else {
        return {
          status: 'error',
          verified: false,
          message: 'Invalid signature',
        };
      }
    } catch (error) {
      return {
        status: 'error',
        verified: false,
        message: error.message,
      };
    }
  },

  /**
   * Refund Razorpay payment
   */
  refundPayment: async (paymentId, amount = null) => {
    try {
      const refund = await razorpay.payments.refund(paymentId, {
        amount: amount ? Math.round(amount * 100) : undefined,
      });
      return {
        status: 'success',
        data: {
          refundId: refund.id,
          amount: refund.amount / 100,
          status: refund.status,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  },

  /**
   * Get payment details
   */
  getPaymentDetails: async (paymentId) => {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return {
        status: 'success',
        data: {
          paymentId: payment.id,
          amount: payment.amount / 100,
          currency: payment.currency,
          status: payment.status,
          method: payment.method,
          email: payment.email,
          contact: payment.contact,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  },
};

export default { stripeService, razorpayService };
