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
  time: Joi.number().allow(null).optional(),
});

async function createInventoryItem(req, res) {
  try {
    const { error, value } = inventoryItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newInventoryItem = new InventoryItem(value);
    await newInventoryItem.save();
    const populatedInventoryItem = await InventoryItem.findById(newInventoryItem._id)
      .populate({ path: 'idSource', model: Source })
      .populate({ path: 'idParamConfig', model: ParamConfig });
    res.status(201).json(populatedInventoryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getInventoryItems(req, res) {
  try {
    const inventoryItems = await InventoryItem.find()
      .populate({ path: 'idSource', model: Source })
      .populate({ path: 'idParamConfig', model: ParamConfig })
      .lean();
    for (const inventoryItem of inventoryItems) {
      if (!inventoryItem.idParamConfig) {
        inventoryItem.idParamConfig = {};
      }
    }
    res.json(inventoryItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getInventoryItemById(req, res) {
  try {
    const { id } = req.params;
    const inventoryItem = await InventoryItem.findById(id)
      .populate({ path: 'idSource', model: Source })
      .populate({ path: 'idParamConfig', model: ParamConfig });
    res.json(inventoryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateInventoryItem(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = inventoryItemSchema.validate(req.body);
    if (error) {
      console.log('error', error);
      return res.status(400).json({ error: error.details[0].message });
    }
    await InventoryItem.findByIdAndUpdate(id, value);
    const updatedInventoryItem = await InventoryItem.findById(id)
      .populate({ path: 'idSource', model: Source })
      .populate({ path: 'idParamConfig', model: ParamConfig });
    res.json(updatedInventoryItem);
  } catch (err) {
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
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createInventoryItem, getInventoryItems, getInventoryItemById, updateInventoryItem, deleteInventoryItem };
