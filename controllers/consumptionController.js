const Consumption = require('../models/consumptionModel');
const Joi = require('joi');

const consumptionSchema = Joi.object({
  idPurchaseItemStory: Joi.object().required(),
  date: Joi.date().required(),
  type: Joi.string().allow('').optional(),
  quantityConsumed: Joi.number().required(),
  waste: Joi.number().optional(),
  cost: Joi.number().optional(),
});

async function createConsumption(req, res) {
  try {
    const { error, value } = consumptionSchema.validate(req.body);
    if (error) {
      console.log("error", error);
      return res.status(400).json({ error: error.details[0].message });
    }
    const newConsumption = new Consumption(value);
    await newConsumption.save();
    res.status(201).json(newConsumption);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ error: err.message });
  }
}

async function getConsumptions(req, res) {
  try {
    const consumptions = await Consumption.find()
      .populate('idPurchaseItemStory');
    res.json(consumptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getConsumptionsByPurchaseItemStory(req, res) {
  try {
    const { idPurchaseItemStory } = req.params;
    const consumptions = await Consumption.find({ idPurchaseItemStory })
      .populate('idPurchaseItemStory');
    res.json(consumptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateConsumption(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = consumptionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedConsumption = await Consumption.findByIdAndUpdate(id, value, { new: true });
    res.json(updatedConsumption);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteConsumption(req, res) {
  try {
    const { id } = req.params;
    await Consumption.findByIdAndDelete(id);
    res.json({ message: 'Consumption deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createConsumption,
  getConsumptions,
  getConsumptionsByPurchaseItemStory,
  updateConsumption,
  deleteConsumption,
};
