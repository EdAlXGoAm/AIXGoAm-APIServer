const Caducidad = require('../models/caducidadModel');
const Joi = require('joi');

const caducidadSchema = Joi.object({
  date_of_purchase: Joi.date().required(),
  date_of_expiration: Joi.date().required()
});

async function createCaducidad(req, res) {
  try {
    const { error, value } = caducidadSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newCaducidad = new Caducidad(value);
    await newCaducidad.save();
    res.status(201).json(newCaducidad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCaducidad(req, res) {
  try {
    const caducidad = await Caducidad.find();
    res.json(caducidad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateCaducidad(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = caducidadSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedCaducidad = await Caducidad.findByIdAndUpdate(id, value, { new: true });
    res.json(updatedCaducidad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createCaducidad,
  getCaducidad,
  updateCaducidad
};
