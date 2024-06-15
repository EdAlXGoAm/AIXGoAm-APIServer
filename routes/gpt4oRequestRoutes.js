const express = require('express');
const router = express.Router();
const gpt4oRequestController = require('../controllers/gpt4oRequestController');

// Ruta para solicitar una respuesta de GPT-4o
router.post('/request/', gpt4oRequestController.request);

module.exports = router;

