import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['appetizer', 'main', 'dessert', 'beverage', 'combo'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    image: {
      type: String,
      default: null,
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    vegan: {
      type: Boolean,
      default: false,
    },
    spicyLevel: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number,
      default: 15,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Index for quick lookups
menuItemSchema.index({ restaurantId: 1, category: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;
