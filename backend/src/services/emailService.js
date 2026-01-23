import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email templates
const emailTemplates = {
  orderConfirmation: `
    <h2>Order Confirmed! ✅</h2>
    <p>Hi {{firstName}},</p>
    <p>Your order #{{orderId}} has been confirmed!</p>
    
    <h3>Order Details:</h3>
    <ul>
      <li><strong>Restaurant:</strong> {{restaurantName}}</li>
      <li><strong>Total:</strong> ₹{{totalPrice}}</li>
      <li><strong>Delivery Time:</strong> {{deliveryTime}} minutes</li>
      <li><strong>Address:</strong> {{deliveryAddress}}</li>
    </ul>
    
    <h3>Items:</h3>
    <ul>
      {{#each items}}
        <li>{{name}} x {{quantity}} - ₹{{price}}</li>
      {{/each}}
    </ul>
    
    <p><a href="{{trackingLink}}">Track your order</a></p>
    <p>Thank you for ordering!</p>
  `,

  orderStatusUpdate: `
    <h2>Order Update 📦</h2>
    <p>Hi {{firstName}},</p>
    <p>Your order #{{orderId}} status has been updated:</p>
    
    <h3>New Status: <strong>{{status}}</strong></h3>
    
    {{#if statusEmoji}}
      <p>{{statusEmoji}} {{statusMessage}}</p>
    {{/if}}
    
    {{#if deliveryPersonName}}
      <p><strong>Delivery Partner:</strong> {{deliveryPersonName}}</p>
      <p><strong>Contact:</strong> {{deliveryPersonPhone}}</p>
    {{/if}}
    
    <p><a href="{{trackingLink}}">Track your order in real-time</a></p>
  `,

  orderDelivered: `
    <h2>Order Delivered! 🎉</h2>
    <p>Hi {{firstName}},</p>
    <p>Your order #{{orderId}} has been delivered!</p>
    
    <p>We hope you enjoyed your meal! Please rate your experience:</p>
    <p><a href="{{ratingLink}}">Leave a Review</a></p>
    
    <p><strong>Delivered at:</strong> {{deliveredTime}}</p>
    <p><strong>Total Amount:</strong> ₹{{totalPrice}}</p>
    
    <h3>Order Summary:</h3>
    <ul>
      {{#each items}}
        <li>{{name}} x {{quantity}}</li>
      {{/each}}
    </ul>
    
    <p>Thanks for your order! Come back soon.</p>
  `,

  orderCancelled: `
    <h2>Order Cancelled ❌</h2>
    <p>Hi {{firstName}},</p>
    <p>Your order #{{orderId}} has been cancelled.</p>
    
    <p><strong>Reason:</strong> {{cancellationReason}}</p>
    <p><strong>Refund Status:</strong> {{refundStatus}}</p>
    <p><strong>Amount Refunded:</strong> ₹{{refundAmount}}</p>
    
    {{#if refundMessage}}
      <p>{{refundMessage}}</p>
    {{/if}}
    
    <p>If you have any questions, please contact our support team.</p>
  `,

  restaurantApproved: `
    <h2>Restaurant Approved! 🎊</h2>
    <p>Hi {{restaurantName}},</p>
    <p>Congratulations! Your restaurant has been approved and is now live on FastFoodBike!</p>
    
    <h3>Next Steps:</h3>
    <ol>
      <li>Upload your restaurant images</li>
      <li>Add menu items with descriptions and prices</li>
      <li>Set your operating hours</li>
      <li>Start receiving orders!</li>
    </ol>
    
    <p><a href="{{dashboardLink}}">Access Your Dashboard</a></p>
  `,

  newRestaurantOrder: `
    <h2>New Order Received! 📋</h2>
    <p>Hi {{restaurantName}},</p>
    <p>You have received a new order!</p>
    
    <h3>Order Details:</h3>
    <ul>
      <li><strong>Order ID:</strong> {{orderId}}</li>
      <li><strong>Customer:</strong> {{customerName}}</li>
      <li><strong>Phone:</strong> {{customerPhone}}</li>
      <li><strong>Delivery Address:</strong> {{deliveryAddress}}</li>
    </ul>
    
    <h3>Items to Prepare:</h3>
    <ul>
      {{#each items}}
        <li>{{name}} x {{quantity}}</li>
      {{/each}}
    </ul>
    
    <p><strong>Special Instructions:</strong> {{notes}}</p>
    <p><strong>Total Amount:</strong> ₹{{totalPrice}}</p>
    
    <p><a href="{{dashboardLink}}">Manage Order</a></p>
  `,

  passwordReset: `
    <h2>Reset Your Password</h2>
    <p>Hi {{firstName}},</p>
    <p>Click the link below to reset your password:</p>
    
    <p><a href="{{resetLink}}">Reset Password</a></p>
    
    <p>This link expires in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `,

  accountCreated: `
    <h2>Welcome to FastFoodBike! 🎉</h2>
    <p>Hi {{firstName}},</p>
    <p>Your account has been created successfully!</p>
    
    <h3>Account Details:</h3>
    <ul>
      <li><strong>Email:</strong> {{email}}</li>
      <li><strong>Name:</strong> {{firstName}} {{lastName}}</li>
      <li><strong>Phone:</strong> {{phone}}</li>
    </ul>
    
    <p>You can now browse restaurants and place orders.</p>
    <p><a href="{{appLink}}">Start Ordering</a></p>
  `,
};

/**
 * Compile email template
 */
const compileTemplate = (templateName, data) => {
  const template = handlebars.compile(emailTemplates[templateName]);
  return template(data);
};

/**
 * Email Service
 */
const emailService = {
  /**
   * Send order confirmation email
   */
  sendOrderConfirmation: async (user, order, restaurant) => {
    try {
      const html = compileTemplate('orderConfirmation', {
        firstName: user.firstName,
        orderId: order._id.toString().slice(-8),
        restaurantName: restaurant.name,
        totalPrice: order.totalPrice.toFixed(2),
        deliveryTime: restaurant.deliveryTime,
        deliveryAddress: order.deliveryAddress,
        items: order.items,
        trackingLink: `${process.env.FRONTEND_URL}/orders/${order._id}`,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: user.email,
        subject: `Order Confirmed - #${order._id.toString().slice(-8)}`,
        html,
      });

      console.log(`Order confirmation email sent to ${user.email}`);
      return { status: 'success' };
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send order status update email
   */
  sendOrderStatusUpdate: async (user, order, status) => {
    try {
      const statusMessages = {
        pending: '⏳ Your order is pending confirmation',
        confirmed: '✅ Your order has been confirmed',
        preparing: '👨‍🍳 Restaurant is preparing your food',
        out_for_delivery: '🚴 Your order is on the way!',
        delivered: '🎉 Your order has been delivered',
        cancelled: '❌ Your order has been cancelled',
      };

      const html = compileTemplate('orderStatusUpdate', {
        firstName: user.firstName,
        orderId: order._id.toString().slice(-8),
        status: status.toUpperCase(),
        statusMessage: statusMessages[status],
        statusEmoji: { pending: '⏳', confirmed: '✅', preparing: '👨‍🍳', out_for_delivery: '🚴', delivered: '🎉', cancelled: '❌' }[status],
        deliveryPersonName: order.deliveryPersonId?.name,
        deliveryPersonPhone: order.deliveryPersonId?.phone,
        trackingLink: `${process.env.FRONTEND_URL}/orders/${order._id}`,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: user.email,
        subject: `Order Update - #${order._id.toString().slice(-8)}: ${statusMessages[status]}`,
        html,
      });

      console.log(`Order status update email sent to ${user.email}`);
      return { status: 'success' };
    } catch (error) {
      console.error('Error sending status update:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send order delivered email
   */
  sendOrderDelivered: async (user, order) => {
    try {
      const html = compileTemplate('orderDelivered', {
        firstName: user.firstName,
        orderId: order._id.toString().slice(-8),
        deliveredTime: new Date(order.deliveredAt).toLocaleString(),
        totalPrice: order.totalPrice.toFixed(2),
        items: order.items,
        ratingLink: `${process.env.FRONTEND_URL}/orders/${order._id}/review`,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: user.email,
        subject: `Order Delivered - #${order._id.toString().slice(-8)}`,
        html,
      });

      console.log(`Order delivered email sent to ${user.email}`);
      return { status: 'success' };
    } catch (error) {
      console.error('Error sending delivered email:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send order cancelled email
   */
  sendOrderCancelled: async (user, order, cancellationReason, refundAmount) => {
    try {
      const html = compileTemplate('orderCancelled', {
        firstName: user.firstName,
        orderId: order._id.toString().slice(-8),
        cancellationReason,
        refundStatus: 'Initiated',
        refundAmount: refundAmount.toFixed(2),
        refundMessage: 'The refund will be credited to your original payment method within 3-5 business days.',
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: user.email,
        subject: `Order Cancelled - #${order._id.toString().slice(-8)}`,
        html,
      });

      console.log(`Order cancelled email sent to ${user.email}`);
      return { status: 'success' };
    } catch (error) {
      console.error('Error sending cancelled email:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send restaurant approved email
   */
  sendRestaurantApproved: async (restaurant) => {
    try {
      const html = compileTemplate('restaurantApproved', {
        restaurantName: restaurant.name,
        dashboardLink: `${process.env.FRONTEND_URL}/restaurant/dashboard`,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: restaurant.email,
        subject: 'Your Restaurant is Approved! 🎊',
        html,
      });

      console.log(`Restaurant approval email sent to ${restaurant.email}`);
      return { status: 'success' };
    } catch (error) {
      console.error('Error sending restaurant approval:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send new order notification to restaurant
   */
  sendNewOrderToRestaurant: async (restaurant, user, order) => {
    try {
      const html = compileTemplate('newRestaurantOrder', {
        restaurantName: restaurant.name,
        orderId: order._id.toString().slice(-8),
        customerName: `${user.firstName} ${user.lastName}`,
        customerPhone: user.phone,
        deliveryAddress: order.deliveryAddress,
        items: order.items,
        notes: order.notes || 'None',
        totalPrice: order.totalPrice.toFixed(2),
        dashboardLink: `${process.env.FRONTEND_URL}/restaurant/dashboard/orders/${order._id}`,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: restaurant.email,
        subject: `New Order Received - #${order._id.toString().slice(-8)}`,
        html,
      });

      console.log(`New order email sent to restaurant ${restaurant.email}`);
      return { status: 'success' };
    } catch (error) {
      console.error('Error sending new order notification:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send account created email
   */
  sendAccountCreated: async (user) => {
    try {
      const html = compileTemplate('accountCreated', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        appLink: process.env.FRONTEND_URL,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: user.email,
        subject: 'Welcome to FastFoodBike! 🎉',
        html,
      });

      console.log(`Account creation email sent to ${user.email}`);
      return { status: 'success' };
    } catch (error) {
      console.error('Error sending account created email:', error);
      return { status: 'error', message: error.message };
    }
  },

  /**
   * Send password reset email
   */
  sendPasswordReset: async (user, resetToken) => {
    try {
      const html = compileTemplate('passwordReset', {
        firstName: user.firstName,
        resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: user.email,
        subject: 'Reset Your FastFoodBike Password',
        html,
      });

      console.log(`Password reset email sent to ${user.email}`);
      return { status: 'success' };
    } catch (error) {
      console.error('Error sending password reset:', error);
      return { status: 'error', message: error.message };
    }
  },
};

export default emailService;
