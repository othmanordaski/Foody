const mongoose = require('mongoose');

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
  ownerId:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'restaurants',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for frequently queried fields
menuSchema.index({ category: 1 });

module.exports = mongoose.model('Menu', menuSchema);
