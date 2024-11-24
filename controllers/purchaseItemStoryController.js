const PurchaseItemStory = require('../models/purchaseItemStoryModel');
const Source = require('../models/sourceModel');
const InventoryItem = require('../models/inventoryItemModel');
const Caducidad = require('../models/caducidadModel');
const Consumption = require('../models/consumptionModel');
const Joi = require('joi');

const purchaseItemStorySchema = Joi.object({
  idSource: Joi.object().required(),
  idInventoryItem: Joi.object().required(),
  copyInventoryItem: Joi.object().required(),
  date: Joi.date().required(),
  quantity: Joi.number().required(),
  consumptionCost: Joi.number().required(),
  discount: Joi.number().required(),
  formulaDiscount: Joi.string().allow('').optional(),
  totalPrice: Joi.number().required(),
  // categorization
  categorized: Joi.boolean().optional(),
  itemLabel: Joi.string().allow('').optional(),
  itemType: Joi.string().allow('').optional(),
  budgetCategory: Joi.string().allow('').optional(),
  purpose: Joi.string().allow('').optional(),
  potential: Joi.string().allow('').optional(),
  potentialReason: Joi.string().allow('').optional(),
  // date of expiration
  expires: Joi.boolean().optional(),
  idExpiration: Joi.object().optional(),
  // id inventory
  inventorized: Joi.boolean().optional(),
  idInventory: Joi.string().allow('').optional(),
  inventoryCategory1: Joi.string().allow('').optional(),
  inventoryCategory2: Joi.string().allow('').optional(),
  inventoryCategory3: Joi.string().allow('').optional(),
  inventoryCategory4: Joi.string().allow('').optional(),
  inventoryCategory5: Joi.string().allow('').optional(),
  // ids consumption history
  measurable: Joi.boolean().optional(),
  measureType: Joi.string().allow('').optional(),
  idsConsumptionHistory: Joi.array().items(Joi.object()).optional(),
  leftQuantity: Joi.number().optional(),
  status: Joi.string().allow('').optional(),
});

async function createPurchaseItemStory(req, res) {
  try {
    const { error, value } = purchaseItemStorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newPurchaseItemStory = new PurchaseItemStory(value);
    await newPurchaseItemStory.save();
    res.status(201).json(newPurchaseItemStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPurchaseItemStories(req, res) {
  try {
    const purchaseItemStories = await PurchaseItemStory.find()
      .populate({ path: 'idSource', model: Source })
      .populate({ path: 'idInventoryItem', model: InventoryItem })
      .populate({ path: 'idExpiration', model: Caducidad })
      .populate({ path: 'idsConsumptionHistory', model: Consumption });
    res.json(purchaseItemStories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPurchaseItemStoryById(req, res) {
  try {
    const { id } = req.params;
    const purchaseItemStory = await PurchaseItemStory.findById(id);
    res.json(purchaseItemStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updatePurchaseItemStory(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = purchaseItemStorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedPurchaseItemStory = await PurchaseItemStory.findByIdAndUpdate(id, value, { new: true });
    res.json(updatedPurchaseItemStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deletePurchaseItemStory(req, res) {
  try {
    const { id } = req.params;
    const purchaseItemStory = await PurchaseItemStory.findById(id);
    if (purchaseItemStory.idExpiration) {
      await Caducidad.findByIdAndDelete(purchaseItemStory.idExpiration);
    }
    if (purchaseItemStory.idsConsumptionHistory) {
      purchaseItemStory.idsConsumptionHistory.forEach(async (id) => {
        await Consumption.findByIdAndDelete(id);
      });
    }
    await PurchaseItemStory.findByIdAndDelete(id);
    res.json({ message: 'PurchaseItemStory deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createPurchaseItemStory,
  getPurchaseItemStories,
  getPurchaseItemStoryById,
  updatePurchaseItemStory,
  deletePurchaseItemStory,
};

