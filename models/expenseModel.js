const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category_group_name: { type: String, required: true },
  category: { type: String, required: true },
  type_group_name: { type: String, required: true },
  type_name: { type: String, required: true },
  account: { type: String, required: true },
  frequency: { type: String, required: true },
  notes: { type: String }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
