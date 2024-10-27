const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

router.post('/', estadoController.createEstado);
router.get('/', estadoController.getEstado);
router.put('/:id', estadoController.updateEstado);

module.exports = router;