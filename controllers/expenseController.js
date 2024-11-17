const Expense = require('../models/expenseModel');
const Joi = require('joi');

// Validación de los datos de gastos
const expenseSchema = Joi.object({
  type: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
  title: Joi.string().required(),
  amount: Joi.number().required(),
  category_group_name: Joi.string().required(),
  category: Joi.string().required(),
  type_group_name: Joi.string().required(),
  type_name: Joi.string().required(),
  account: Joi.string().required(),
  frequency: Joi.string().required(),
  notes: Joi.string().allow('').optional()
});

async function createExpense(req, res) {
  try {
    const { error, value } = expenseSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    const newExpense = new Expense(value);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getExpenses(req, res) {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateExpense(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = expenseSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, value, { new: true });
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteExpense(req, res) {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};