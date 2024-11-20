const express = require('express');
const router = express.Router();
const caducidadController = require('../controllers/caducidadController');

router.post('/', caducidadController.createCaducidad);
router.get('/', caducidadController.getCaducidad);
router.get('/:id', caducidadController.getCaducidadById);
router.put('/:id', caducidadController.updateCaducidad);
router.delete('/:id', caducidadController.deleteCaducidad);

module.exports = router;