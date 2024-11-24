const CartItem = require('../models/cartItemsModel');
const Joi = require('joi');

const cartItemSchema = Joi.object({
  idInventoryItem: Joi.object().required(),
  idSource: Joi.object().required(),
  quantity: Joi.number().required(),
  totalPrice: Joi.number().required(),
  priority: Joi.string().required(),
});

async function createCartItem(req, res) {
  try {
    const { error, value } = cartItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newCartItem = new CartItem(value);
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCartItems(req, res) {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateCartItem(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = cartItemSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      await CartItem.findByIdAndUpdate(id, value);
      res.status(200).json({ message: 'Cart item updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
  }
}

async function deleteCartItem(req, res) {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Cart item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

module.exports = { createCartItem, getCartItems, updateCartItem, deleteCartItem };
