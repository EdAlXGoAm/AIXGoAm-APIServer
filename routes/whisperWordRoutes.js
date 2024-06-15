const express = require('express');
const router = express.Router();
const whisperWordController = require('../controllers/whisperWordController');

// Ruta para solicitar una respuesta de whisper
router.post('/request/', whisperWordController.request);

module.exports = router;

