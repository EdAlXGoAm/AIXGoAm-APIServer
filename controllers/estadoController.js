const Estado = require('../models/estadoModel');
const Joi = require('joi');

const estadoSchema = Joi.object({
  name: Joi.string().required(),
  warning: Joi.string().allow('').optional()
});

async function createEstado(req, res) {
  try {
    const { error, value } = estadoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newEstado = new Estado(value);
    await newEstado.save();
    res.status(201).json(newEstado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getEstado(req, res) {
  try {
    const estados = await Estado.find();
    res.json(estados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateEstado(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = estadoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedEstado = await Estado.findByIdAndUpdate(id, value, { new: true });
    res.json(updatedEstado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createEstado,
  getEstado,
  updateEstado
};
