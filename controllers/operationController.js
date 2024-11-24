const Operation = require('../models/operationModel');
const RelatedOperation = require('../models/relatedOperationModel');
const Joi = require('joi');

const operationSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().required().valid('Ingreso', 'Gasto', 'Transferencia'),
  name: Joi.string().required(),
  amount: Joi.number().required(),
  label: Joi.string().required().valid('Ingreso', 'Compra', 'Adicional', 'Impuesto', 'Aportaciones'),
  description: Joi.string().allow('').optional(),
  accounts: Joi.array().items(Joi.string()).optional(),
  deferred: Joi.array().items(Joi.boolean()).required(),
  installments: Joi.array().items(Joi.number()).optional(),
  items: Joi.array().items(Joi.object().optional()),
});

async function createOperation(req, res) {
  try {
    const { error, value } = operationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newOperation = new Operation(value);
    await newOperation.save();
    res.status(201).json(newOperation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOperations(req, res) {
  try {
    const operations = await Operation.find()
      .populate({ path: 'items', model: Item });
    res.json(operations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateOperation(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = operationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await Operation.findByIdAndUpdate(id, value);
    res.status(200).json({ message: 'Operation updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteOperation(req, res) {
  try {
    const { id } = req.params;
    const operation = await Operation.findById(id)
      .populate({ path: 'items', model: Item });
    await Promise.all(operation.items.map(async (item) => {
      await Item.findByIdAndDelete(item._id);
    }));
    await Operation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Operation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createOperation, getOperations, updateOperation, deleteOperation };
