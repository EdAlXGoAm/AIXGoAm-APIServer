const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  idSource: { type: mongoose.Schema.Types.ObjectId, ref: 'Source', required: true },
  idParamConfig: { type: mongoose.Schema.Types.ObjectId, ref: 'ParamConfig', required: true },
  providerName: { type: String, required: false },
  name: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  link: { type: String, required: false },
  price: { type: Number, required: true },
  quantity: { type: Number, required: false },
  weight: { type: Number, required: false },
  volume: { type: Number, required: false },
  time: { type: Number, required: false },
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema, 'InventoryItem');
module.exports = InventoryItem;
