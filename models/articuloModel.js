const mongoose = require('mongoose');

const articuloSchema = new mongoose.Schema({
  date_of_purchase: { type: Date, required: true },
  cost: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  //----------------------------------------------
  amount: { type: Number, required: true },
  weight: { type: Number, required: true },
  volume: { type: Number, required: true },
  //----------------------------------------------
  id_param_config: { type: String, required: false },
  id_operation: { type: String, required: false },
  id_place_person_site_transaction: { type: String, required: false },
  ids_consumption_history: { type: [String], required: false },
});

const Articulo = mongoose.model('Articulo', articuloSchema, 'Articulo');
module.exports = Articulo;