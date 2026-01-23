import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;

/**
 * SMS Service for notifications
 */
const smsService = {
  /**
   * Send order confirmation SMS
   */
  sendOrderConfirmation: async (phoneNumber, orderId, restaurantName) => {
    try {
      const message = await client.messages.create({
        body: `🎉 Order confirmed! Order #${orderId.slice(-8)} from ${restaurantName}. Track your order: https://fastfoodbike.com/orders/${orderId}`,
        from: TWILIO_PHONE,
        to: phoneNumber,
      });
      console.log(`Order confirmation SMS sent to ${phoneNumber}`);
      return { status: 'success', messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send order status update SMS
   */
  sendStatusUpdate: async (phoneNumber, orderId, status) => {
    try {
      const statusMessages = {
        pending: '⏳ Your order is pending confirmation',
        confirmed: '✅ Your order has been confirmed',
        preparing: '👨‍🍳 Restaurant is preparing your food',
        out_for_delivery: '🚴 Your order is on the way!',
        delivered: '🎉 Your order has been delivered',
        cancelled: '❌ Your order has been cancelled',
      };

      const message = await client.messages.create({
        body: `${statusMessages[status]} - Order #${orderId.slice(-8)}`,
        from: TWILIO_PHONE,
        to: phoneNumber,
      });
      console.log(`Status update SMS sent to ${phoneNumber}`);
      return { status: 'success', messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send delivery person alert SMS to user
   */
  sendDeliveryPersonInfo: async (phoneNumber, deliveryPersonName, deliveryPersonPhone) => {
    try {
      const message = await client.messages.create({
        body: `Your delivery partner ${deliveryPersonName} is arriving soon. Contact: ${deliveryPersonPhone}`,
        from: TWILIO_PHONE,
        to: phoneNumber,
      });
      console.log(`Delivery person info SMS sent to ${phoneNumber}`);
      return { status: 'success', messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send order delivery confirmation SMS
   */
  sendDeliveryConfirmation: async (phoneNumber, orderId, totalAmount) => {
    try {
      const message = await client.messages.create({
        body: `🎉 Order delivered! #${orderId.slice(-8)} - Amount: ₹${totalAmount}. Rate us: https://fastfoodbike.com/orders/${orderId}/review`,
        from: TWILIO_PHONE,
        to: phoneNumber,
      });
      console.log(`Delivery confirmation SMS sent to ${phoneNumber}`);
      return { status: 'success', messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send cancellation confirmation SMS
   */
  sendCancellationConfirmation: async (phoneNumber, orderId, refundAmount) => {
    try {
      const message = await client.messages.create({
        body: `❌ Order #${orderId.slice(-8)} cancelled. Refund of ₹${refundAmount} initiated. It will reflect in 3-5 business days.`,
        from: TWILIO_PHONE,
        to: phoneNumber,
      });
      console.log(`Cancellation confirmation SMS sent to ${phoneNumber}`);
      return { status: 'success', messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send restaurant new order alert SMS
   */
  sendNewOrderAlert: async (phoneNumber, orderId, itemCount) => {
    try {
      const message = await client.messages.create({
        body: `📋 New order received! #${orderId.slice(-8)} - ${itemCount} item(s). Prepare and confirm.`,
        from: TWILIO_PHONE,
        to: phoneNumber,
      });
      console.log(`New order alert SMS sent to ${phoneNumber}`);
      return { status: 'success', messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send password reset SMS
   */
  sendPasswordResetOTP: async (phoneNumber, otp) => {
    try {
      const message = await client.messages.create({
        body: `Your FastFoodBike password reset OTP is: ${otp}. Valid for 10 minutes.`,
        from: TWILIO_PHONE,
        to: phoneNumber,
      });
      console.log(`Password reset OTP SMS sent to ${phoneNumber}`);
      return { status: 'success', messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send account verification OTP
   */
  sendVerificationOTP: async (phoneNumber, otp) => {
    try {
      const message = await client.messages.create({
        body: `Your FastFoodBike verification code is: ${otp}. Do not share with anyone.`,
        from: TWILIO_PHONE,
        to: phoneNumber,
      });
      console.log(`Verification OTP SMS sent to ${phoneNumber}`);
      return { status: 'success', messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send promotional SMS
   */
  sendPromotion: async (phoneNumber, promoCode, discountPercentage) => {
    try {
      const message = await client.messages.create({
        body: `🎆 Special offer! Use code ${promoCode} for ${discountPercentage}% off on your next order. Valid till end of month.`,
        from: TWILIO_PHONE,
        to: phoneNumber,
      });
      console.log(`Promotional SMS sent to ${phoneNumber}`);
      return { status: 'success', messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'error', message: error.message };
    }
  },
};

export default smsService;
