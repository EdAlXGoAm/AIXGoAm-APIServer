const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  itemsCart: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }], required: false },
  itemsTracking: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrackingItem' }], required: false },
  itemsInventory: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }], required: false },
  purchaseHistory: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseItemStory' }], required: false },
});

const Source = mongoose.model('Source', sourceSchema, 'Source');
module.exports = Source;
