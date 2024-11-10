const Operation = require('../models/operationModel');
const RelatedOperation = require('../models/relatedOperationModel');
const Joi = require('joi');

const operationSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().required().valid('Ingreso', 'Gasto', 'Transferencia'),
  name: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string().allow('').optional(),
  account: Joi.string().allow('').optional(),
  deferred: Joi.boolean().required(),
  installments: Joi.number().optional(),
  preRelatedOperations: Joi.array().items(Joi.object().optional()),
  preAmount: Joi.number().required(),
  postRelatedOperations: Joi.array().items(Joi.object().optional()),
  postAmount: Joi.number().required(),
  operationAmount: Joi.number().required(),
  amountToShow: Joi.string().required().valid('operationAmount', 'preAmount', 'postAmount'),
});

async function createOperation(req, res) {
  try {
    const { error, value } = operationSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    const newOperation = new Operation(value);
    await newOperation.save();
    res.status(201).json(newOperation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function getOperations(req, res) {
  try {
    const operations = await Operation.find()
      .populate({ path: 'preRelatedOperations', model: RelatedOperation })
      .populate({ path: 'postRelatedOperations', model: RelatedOperation });
    res.json(operations);
  } catch (err) {
    console.log(err);
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
      .populate({ path: 'preRelatedOperations', model: RelatedOperation })
      .populate({ path: 'postRelatedOperations', model: RelatedOperation });
    await Promise.all(operation.preRelatedOperations.map(async (relatedOperation) => {
      await RelatedOperation.findByIdAndDelete(relatedOperation._id);
    }));
    await Promise.all(operation.postRelatedOperations.map(async (relatedOperation) => {
      await RelatedOperation.findByIdAndDelete(relatedOperation._id);
    }));
    await Operation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Operation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createOperation, getOperations, updateOperation, deleteOperation };
