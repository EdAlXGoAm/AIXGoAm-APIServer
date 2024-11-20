const mongoose = require('mongoose');

const purchaseItemStorySchema = new mongoose.Schema({
  idSource: { type: mongoose.Schema.Types.ObjectId, ref: 'Source', required: true },
  idInventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
  copyInventoryItem: { type: Object, required: false },
  date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  consumptionCost: { type: Number, required: false },
  discount: { type: Number, required: false },
  formulaDiscount: { type: String, required: false },
  totalPrice: { type: Number, required: true },
  // categorization
  categorized: { type: Boolean, required: false },
  itemLabel: { type: String, required: false },
  itemType: { type: String, required: false },
  budgetCategory: { type: String, required: false },
  purpose: { type: String, required: false },
  potential: { type: String, required: false },
  potentialReason: { type: String, required: false },
  // date of expiration
  expires: { type: Boolean, required: false },
  idExpiration: { type: mongoose.Schema.Types.ObjectId, ref: 'Caducidad', required: false },
  // id inventory
  inventorized: { type: Boolean, required: false },
  idInventory: { type: String, required: false },
  inventoryCategory1: { type: String, required: false },
  inventoryCategory2: { type: String, required: false },
  inventoryCategory3: { type: String, required: false },
  inventoryCategory4: { type: String, required: false },
  inventoryCategory5: { type: String, required: false },
  // ids consumption history
  idsConsumptionHistory: { type: [mongoose.Schema.Types.ObjectId], ref: 'Consumption', required: false },
  leftQuantity: { type: Number, required: false },
});

const PurchaseItemStory = mongoose.model('PurchaseItemStory', purchaseItemStorySchema, 'PurchaseItemStory');
module.exports = PurchaseItemStory;
