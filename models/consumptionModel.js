const mongoose = require('mongoose');

const consumptionSchema = new mongoose.Schema({
  idPurchaseItemStory: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseItemStory', required: true },
  date: { type: Date, required: true },
  type: { type: String, required: false },
  quantityConsumed: { type: Number, required: true },
  waste: { type: Number, required: false },
  cost: { type: Number, required: false },
});

const Consumption = mongoose.model('Consumption', consumptionSchema, 'Consumption');
module.exports = Consumption;
