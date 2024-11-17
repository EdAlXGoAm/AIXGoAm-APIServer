const mongoose = require('mongoose');

const trackingItemSchema = new mongoose.Schema({
  idSource: { type: mongoose.Schema.Types.ObjectId, ref: 'Source', required: true },
  idInventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
  copyInventoryItem: { type: Object, required: false },
  date: { type: Date, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
});

const TrackingItem = mongoose.model('TrackingItem', trackingItemSchema, 'TrackingItem');
module.exports = TrackingItem;

