const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
  {
    // Reference to the restaurant this menu item belongs to
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Please provide a restaurant ID']
    },
    name: {
      type: String,
      required: [true, 'Please add a dish name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
      // Note: unique is global; consider removing if same dish name can appear in different restaurants
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be positive'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: {
        values: [
          'Soups',
          'Swallows',
          'Rice Dishes',
          'Snacks',
          'Grilled & Fried',
          'Drinks',
          'Desserts',
        ],
        message: 'Please select a valid category',
      },
    },
    image: {
      type: String,
      default: function() {
        return `${this.name}.png`;
      },
      required: [true, 'Please add an image URL']
    },
    ingredients: {
      type: [String],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    spicyLevel: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    preparationTime: {
      type: Number, // in minutes
      min: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Optional: Create a compound index to ensure a dish name is unique per restaurant
// MenuSchema.index({ restaurantId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Menu', MenuSchema);