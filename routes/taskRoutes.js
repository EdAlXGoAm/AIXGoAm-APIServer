const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Ruta para obtener todas las tareas
router.get('/get/', taskController.getTasks);

module.exports = router;