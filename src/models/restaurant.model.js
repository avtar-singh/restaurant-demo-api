const mongoose = require('mongoose');

/* Menu Schema Definition */
const menuSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true,
  },
  section: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        trim: true,
      },
    },
  ],
});

/* Restaurant Schema Definition */
const RestaurantSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: Array,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      enum: ['disable', 'enable'],
      default: 'enable',
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    menus: [menuSchema],
  },
  {
    timestamps: true,
    // toObject: { getters: true },
    // toJSON: { getters: true },
  }
);

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
