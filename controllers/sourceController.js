const Source = require('../models/sourceModel');
const CartItem = require('../models/cartItemsModel');
const TrackingItem = require('../models/trackingItemsModel');
const InventoryItem = require('../models/inventoryItemModel');
const PurchaseItemStory = require('../models/purchaseItemStoryModel');
const Joi = require('joi');

const sourceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  image: Joi.string().allow('').optional(),
  itemsCart: Joi.array().items(Joi.object().optional()),
  itemsTracking: Joi.array().items(Joi.object().optional()),
  itemsInventory: Joi.array().items(Joi.object().optional()),
  purchaseHistory: Joi.array().items(Joi.object().optional()),
});

async function createSource(req, res) {
  try {
    const { error, value } = sourceSchema.validate(req.body);
    if (error) {
      console.log('error', error);
      return res.status(400).json({ error: error.details[0].message });
    }
    const newSource = new Source(value);
    await newSource.save();
    const populatedSource = await Source.findById(newSource._id)
      .populate({ path: 'itemsCart', model: CartItem })
      .populate({ path: 'itemsTracking', model: TrackingItem })
      .populate({ path: 'itemsInventory', model: InventoryItem })
      .populate({ path: 'purchaseHistory', model: PurchaseItemStory });
    console.log('populatedSource', populatedSource);
    res.json(populatedSource);
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ error: err.message });
  }
}

async function getSources(req, res) {
  try {
    const sources = await Source.find()
      .populate({ path: 'itemsCart', model: CartItem })
      .populate({ path: 'itemsTracking', model: TrackingItem })
      .populate({ path: 'itemsInventory', model: InventoryItem })
      .populate({ path: 'purchaseHistory', model: PurchaseItemStory });
    res.json(sources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getSourceById(req, res) {
  try {
    const { id } = req.params;
    const source = await Source.findById(id);
    res.json(source);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateSource(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = sourceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await Source.findByIdAndUpdate(id, value);
    const updatedSource = await Source.findById(id)
      .populate({ path: 'itemsCart', model: CartItem })
      .populate({ path: 'itemsTracking', model: TrackingItem })
      .populate({ path: 'itemsInventory', model: InventoryItem })
      .populate({ path: 'purchaseHistory', model: PurchaseItemStory });
    console.log('updatedSource', updatedSource);
    res.json(updatedSource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteSource(req, res) {
  try {
    const { id } = req.params;
    const source = await Source.findById(id)
      .populate({ path: 'itemsCart', model: CartItem })
      .populate({ path: 'itemsTracking', model: TrackingItem })
      .populate({ path: 'itemsInventory', model: InventoryItem })
      .populate({ path: 'purchaseHistory', model: PurchaseItemStory });
    await Promise.all(source.itemsCart.map(async (item) => {
      await CartItem.findByIdAndDelete(item._id);
    }));
    await Promise.all(source.itemsTracking.map(async (item) => {
      await TrackingItem.findByIdAndDelete(item._id);
    }));
    await Promise.all(source.itemsInventory.map(async (item) => {
      await InventoryItem.findByIdAndDelete(item._id);
    }));
    await Promise.all(source.purchaseHistory.map(async (item) => {
      await PurchaseItemStory.findByIdAndDelete(item._id);
    }));
    await Source.findByIdAndDelete(id);
    res.status(200).json({ message: 'Source deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createSource, getSources, getSourceById, updateSource, deleteSource };
