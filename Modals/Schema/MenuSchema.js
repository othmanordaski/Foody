const mongoose = require('mongoose');

const dietarySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Nut-Free', 'Dairy-Free', 'No Soy'],
  },
});

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const variationSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
  },
  image : {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  variations: [variationSchema],
  dietary: [dietarySchema],
  reviews: [reviewSchema],
});

// Add indexes for frequently queried fields
menuSchema.index({ category: 1 });

module.exports = mongoose.model('Menu', menuSchema);
