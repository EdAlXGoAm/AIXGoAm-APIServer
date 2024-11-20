const mongoose = require('mongoose');

const caducidadSchema = new mongoose.Schema({
  datePurchase: { type: Date, required: true },
  dateExpiration: { type: Date, required: true },
});

const Caducidad = mongoose.model('Caducidad', caducidadSchema, 'Caducidad');
module.exports = Caducidad;

