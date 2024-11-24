const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ['Ingreso', 'Gasto', 'Transferencia'] },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  label: { type: String, required: true, enum: ['Ingreso', 'Compra', 'Adicional', 'Impuesto', 'Aportaciones', 'Prestamo'] },
  description: { type: String, required: false },
  accounts: { type: [String], required: false },
  deferred: { type: [Boolean], required: true },
  installments: { type: [Number], required: false },
  items: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], required: false },
});

const Operation = mongoose.model('Operation', operationSchema, 'Operation');
module.exports = Operation;
