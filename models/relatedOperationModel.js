const mongoose = require('mongoose');

const relatedOperationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  source: { type: String, required: false },
  formula: { type: String, required: false },
});

const RelatedOperation = mongoose.model('RelatedOperation', relatedOperationSchema, 'RelatedOperation');
module.exports = RelatedOperation;
