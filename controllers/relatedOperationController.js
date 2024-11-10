const RelatedOperation = require('../models/relatedOperationModel');
const Joi = require('joi');

const relatedOperationSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().required(),
  name: Joi.string().required(),
  amount: Joi.number().required(),
  source: Joi.string().allow('').optional(),
  formula: Joi.string().allow('').optional(),
});

async function createRelatedOperation(req, res) {
  try {
    const { error, value } = relatedOperationSchema.validate(req.body);
    console.log(value);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    const newRelatedOperation = new RelatedOperation(value);
    await newRelatedOperation.save();
    res.status(201).json(newRelatedOperation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function getRelatedOperations(req, res) {
  try {
    const relatedOperations = await RelatedOperation.find();
    res.json(relatedOperations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getRelatedOperation(req, res) {
  try {
    const { id } = req.params;
    const relatedOperation = await RelatedOperation.findById(id);
    res.json(relatedOperation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateRelatedOperation(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = relatedOperationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedRelatedOperation = await RelatedOperation.findByIdAndUpdate(id, value, { new: true });
    res.json(updatedRelatedOperation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteRelatedOperation(req, res) {
  try {
    const { id } = req.params;
    await RelatedOperation.findByIdAndDelete(id);
    res.json({ message: 'Related operation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createRelatedOperation, getRelatedOperations, getRelatedOperation, updateRelatedOperation, deleteRelatedOperation };
