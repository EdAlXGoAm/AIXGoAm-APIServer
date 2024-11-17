const mongoose = require('mongoose');

const cartItemsSchema = new mongoose.Schema({
  idInventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
  idSource: { type: mongoose.Schema.Types.ObjectId, ref: 'Source', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  priority: { type: String, required: true },
});

const CartItem = mongoose.model('CartItem', cartItemsSchema, 'CartItem');
module.exports = CartItem;
