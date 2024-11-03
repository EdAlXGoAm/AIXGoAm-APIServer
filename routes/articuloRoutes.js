const express = require('express');
const router = express.Router();
const articuloController = require('../controllers/articuloController');

router.post('/', articuloController.createArticulo);
router.get('/', articuloController.getArticulos);
router.put('/:id', articuloController.updateArticulo);

module.exports = router;