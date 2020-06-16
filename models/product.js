const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  foodType: {
    type: String,
    enum: ['Fruit', 'Vegetable', 'Dairy', 'Meat', 'Donation'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  farmerStore: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Non-GMO', 'Organic']
  },
  inventory: {
    type: Number
  }
});

productSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'products'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
