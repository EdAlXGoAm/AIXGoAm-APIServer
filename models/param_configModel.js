const mongoose = require('mongoose');

const param_configSchema = new mongoose.Schema({
  amount_unit: { type: String, required: false },
  weight_unit: { type: String, required: false },
  volume_unit: { type: String, required: false },
  preferred_unit: { type: String, required: false },
  //----------------------------------------------
  states_list: { type: [String], required: false },
});

const Param_config = mongoose.model('Param_config', param_configSchema, 'Param_config');
module.exports = Param_config;
