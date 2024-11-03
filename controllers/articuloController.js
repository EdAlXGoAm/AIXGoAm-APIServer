const Articulo = require('../models/articuloModel');
const Joi = require('joi');

const articuloSchema = Joi.object({
  date_of_purchase: Joi.date().required(),
  cost: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  amount: Joi.number().required(),
  weight: Joi.number().required(),
  volume: Joi.number().required(),
  id_param_config: Joi.string().allow('').optional(),
  id_operation: Joi.string().allow('').optional(),
  id_place_person_site_transaction: Joi.string().allow('').optional(),
  ids_consumption_history: Joi.array().items(Joi.string().allow('')).allow('').optional(),
});

async function createArticulo(req, res) {
  try {
    const { error, value } = articuloSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    const newArticulo = new Articulo(value);
    await newArticulo.save();
    res.status(201).json(newArticulo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function getArticulos(req, res) {
  try {
    const articulos = await Articulo.find();
    res.json(articulos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateArticulo(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = articuloSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedArticulo = await Articulo.findByIdAndUpdate(id, value, { new: true });
    res.json(updatedArticulo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createArticulo,
  getArticulos,
  updateArticulo,
};
