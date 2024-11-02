const mongoose = require('mongoose');

const param_configSchema = new mongoose.Schema({
  amount_unit: { type: String, required: true },
  weight_unit: { type: String, required: true },
  volume_unit: { type: String, required: true },
  preferred_unit: { type: String, required: true },
  //----------------------------------------------
  states_list: { type: [String], required: true },
});

const Param_config = mongoose.model('Param_config', param_configSchema, 'Param_config');
module.exports = Param_config;
