const Param_config = require('../models/paramConfigModel');
const Joi = require('joi');

const param_configSchema = Joi.object({
  quantity_unit: Joi.string().allow('').optional(),
  weight_unit: Joi.string().allow('').optional(),
  volume_unit: Joi.string().allow('').optional(),
  time_unit: Joi.string().allow('').optional(),
  default_unit: Joi.string().allow('').optional(),
  reference_unit: Joi.string().allow('').optional(),
  states_list: Joi.array().items(Joi.string()).allow('').optional(),
});

async function createParam_config(req, res) {
  try {
    const { error, value } = param_configSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newParam_config = new Param_config(value);
    await newParam_config.save();
    res.status(201).json(newParam_config);
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ error: err.message });
  }
}

async function getParam_config(req, res) {
  try {
    const param_config = await Param_config.find();
    res.json(param_config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getParam_configById(req, res) {
  try {
    const { id } = req.params;
    const param_config = await Param_config.findById(id);
    res.json(param_config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateParam_config(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = param_configSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedParam_config = await Param_config.findByIdAndUpdate(id, value, { new: true });
    res.json(updatedParam_config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteParam_config(req, res) {
  try {
    const { id } = req.params;
    await Param_config.findByIdAndDelete(id);
    res.status(200).json({ message: 'Param_config deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createParam_config,
  getParam_config,
  getParam_configById,
  updateParam_config,
  deleteParam_config
};
