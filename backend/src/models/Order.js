import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MenuItem',
        },
        name: String,
        price: Number,
        quantity: Number,
        specialInstructions: String,
        subtotal: Number,
      },
    ],
    deliveryAddress: {
      street: String,
      city: String,
      zipCode: String,
      country: String,
      latitude: Number,
      longitude: Number,
      instructions: String,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
      default: 'pending',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'cash'],
      default: 'stripe',
    },
    stripePaymentId: String,
    subtotal: Number,
    deliveryFee: Number,
    tax: Number,
    discount: {
      code: String,
      amount: Number,
    },
    total: Number,
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Delivery',
    },
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    rating: {
      score: { type: Number, min: 1, max: 5 },
      comment: String,
      ratedAt: Date,
    },
    notes: String,
    cancelledAt: Date,
    cancelReason: String,
  },
  { timestamps: true }
);

// Generate order number before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const date = new Date();
    const timestamp = date.getTime();
    const random = Math.floor(Math.random() * 10000);
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  next();
});

// Indexes
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ restaurant: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ delivery: 1 });
orderSchema.index({ 'paymentStatus': 1 });

export const Order = mongoose.model('Order', orderSchema);

export default Order;
