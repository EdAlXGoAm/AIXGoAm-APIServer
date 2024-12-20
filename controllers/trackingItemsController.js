const TrackingItem = require('../models/trackingItemsModel');
const InventoryItem = require('../models/inventoryItemModel');
const Source = require('../models/sourceModel');
const Joi = require('joi');

const trackingItemSchema = Joi.object({
  idSource: Joi.object().required(),
  idInventoryItem: Joi.object().required(),
  copyInventoryItem: Joi.object().allow(null).optional(),
  date: Joi.date().required(),
  stock: Joi.number().required(),
  price: Joi.number().required(),
});

async function createTrackingItem(req, res) {
  try {
    const { error } = trackingItemSchema.validate(req.body);
    if (error) {
      console.log(error);
      console.log(req.body);
      return res.status(400).json({ error: error.details[0].message });
    }
    const newTrackingItem = new TrackingItem(req.body);
    await newTrackingItem.save();
    res.status(201).json(newTrackingItem);
  } catch (err) {
    console.log(err);
    console.log(req.body);
    res.status(500).json({ error: err.message });
  }
}

async function getTrackingItems(req, res) {
  try {
    const trackingItems = await TrackingItem.find()
      .populate({ path: 'idSource', model: Source })
      .populate({ path: 'idInventoryItem', model: InventoryItem });
    console.log('trackingItems', trackingItems);
    res.json(trackingItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function updateTrackingItem(req, res) {
  try {
    const { id } = req.params;
    const { error } = trackingItemSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    await TrackingItem.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: 'Tracking item updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function deleteTrackingItem(req, res) {
  try {
    const { id } = req.params;
    await TrackingItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tracking item deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createTrackingItem, getTrackingItems, updateTrackingItem, deleteTrackingItem };