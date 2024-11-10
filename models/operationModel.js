const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ['Ingreso', 'Gasto', 'Transferencia'] },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: false },
  account: { type: String, required: false },
  deferred: { type: Boolean, required: true },
  installments: { type: Number, required: false },
  preRelatedOperations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RelatedOperation' }],
  preAmount: { type: Number, required: true },
  postRelatedOperations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RelatedOperation' }],
  postAmount: { type: Number, required: true },
  operationAmount: { type: Number, required: true },
  amountToShow: { type: String, required: true, enum: ['operationAmount', 'preAmount', 'postAmount'] },
});

const Operation = mongoose.model('Operation', operationSchema, 'Operation');
module.exports = Operation;
