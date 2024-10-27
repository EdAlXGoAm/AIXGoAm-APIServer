const mongoose = require('mongoose');

const caducidadSchema = new mongoose.Schema({
  date_of_purchase: { type: Date, required: true },
  date_of_expiration: { type: Date, required: true },
});

const Caducidad = mongoose.model('Caducidad', caducidadSchema, 'Caducidad');
module.exports = Caducidad;

