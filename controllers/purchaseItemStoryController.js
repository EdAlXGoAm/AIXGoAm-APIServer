const PurchaseItemStory = require('../models/purchaseItemStoryModel');
const Joi = require('joi');

const purchaseItemStorySchema = Joi.object({
  idSource: Joi.object().required(),
  idInventoryItem: Joi.object().required(),
  copyInventoryItem: Joi.object().required(),
  date: Joi.date().required(),
  quantity: Joi.number().required(),
  totalPrice: Joi.number().required(),
});

async function createPurchaseItemStory(req, res) {
  try {
    const { error, value } = purchaseItemStorySchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    const newPurchaseItemStory = new PurchaseItemStory(value);
    await newPurchaseItemStory.save();
    res.status(201).json(newPurchaseItemStory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function getPurchaseItemStories(req, res) {
  try {
    const purchaseItemStories = await PurchaseItemStory.find()
    res.json(purchaseItemStories);
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function deletePurchaseItemStory(req, res) {
  try {
    const { id } = req.params;
    await PurchaseItemStory.findByIdAndDelete(id);
    res.json({ message: 'PurchaseItemStory deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createPurchaseItemStory,
  getPurchaseItemStories,
  updatePurchaseItemStory,
  deletePurchaseItemStory,
};

