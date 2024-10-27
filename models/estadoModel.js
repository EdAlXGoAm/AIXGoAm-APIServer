const mongoose = require('mongoose');

const estadoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  warning: { type: String, required: false },
});

const Estado = mongoose.model('Estado', estadoSchema, 'Estado');
module.exports = Estado;
