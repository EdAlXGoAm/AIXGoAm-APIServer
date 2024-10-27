const express = require('express');
const router = express.Router();
const caducidadController = require('../controllers/caducidadController');

router.post('/', caducidadController.createCaducidad);
router.get('/', caducidadController.getCaducidad);
router.put('/:id', caducidadController.updateCaducidad);

module.exports = router;