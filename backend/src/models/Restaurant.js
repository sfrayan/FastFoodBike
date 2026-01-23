import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cuisineType: [String], // e.g., ['Italian', 'Pizza']
    image: String,
    logo: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipCode: String,
      country: String,
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    deliveryFee: {
      type: Number,
      default: 2.99,
    },
    minOrder: {
      type: Number,
      default: 10,
    },
    estimatedDelivery: {
      min: { type: Number, default: 30 }, // minutes
      max: { type: Number, default: 60 },
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    operatingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    phone: String,
    website: String,
    tags: [String],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Geospatial index for location queries
restaurantSchema.index({ 'address.latitude': 1, 'address.longitude': 1 });
restaurantSchema.index({ name: 'text', cuisineType: 'text', tags: 'text' });
restaurantSchema.index({ rating: -1 });
restaurantSchema.index({ owner: 1 });

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
