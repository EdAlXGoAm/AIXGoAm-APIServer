const mongoose = require('mongoose');

const purchaseItemStorySchema = new mongoose.Schema({
  idSource: { type: mongoose.Schema.Types.ObjectId, ref: 'Source', required: true },
  idInventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
  copyInventoryItem: { type: Object, required: false },
  date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const PurchaseItemStory = mongoose.model('PurchaseItemStory', purchaseItemStorySchema, 'PurchaseItemStory');
module.exports = PurchaseItemStory;
