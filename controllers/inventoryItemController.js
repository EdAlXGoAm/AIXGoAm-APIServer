const InventoryItem = require('../models/inventoryItemModel');
const Source = require('../models/sourceModel');
const ParamConfig = require('../models/paramConfigModel');
const Joi = require('joi');

const inventoryItemSchema = Joi.object({
  idSource: Joi.object().required(),
  idParamConfig: Joi.object().required(),
  providerName: Joi.string().allow('').optional(),
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  image: Joi.string().allow('').optional(),
  link: Joi.string().allow('').optional(),
  price: Joi.number().required(),
  quantity: Joi.number().allow(null).optional(),
  weight: Joi.number().allow(null).optional(),
  volume: Joi.number().allow(null).optional(),
});

async function createInventoryItem(req, res) {
  try {
    const { error, value } = inventoryItemSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    const newInventoryItem = new InventoryItem(value);
    await newInventoryItem.save();
    res.status(201).json(newInventoryItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function getInventoryItems(req, res) {
  try {
    const inventoryItems = await InventoryItem.find()
      .populate({ path: 'idSource', model: Source })
      .populate({ path: 'idParamConfig', model: ParamConfig });
    res.json(inventoryItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function updateInventoryItem(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = inventoryItemSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(id, value, { new: true });
    res.json(updatedInventoryItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function deleteInventoryItem(req, res) {
  try {
    const { id } = req.params;
    const inventoryItem = await InventoryItem.findById(id)
    await ParamConfig.findByIdAndDelete(inventoryItem.idParamConfig);
    await InventoryItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Inventory item deleted', inventoryItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createInventoryItem, getInventoryItems, updateInventoryItem, deleteInventoryItem };
