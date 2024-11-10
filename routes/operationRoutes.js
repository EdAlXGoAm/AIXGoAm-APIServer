const express = require('express');
const router = express.Router();
const operationController = require('../controllers/operationController');

router.post('/', operationController.createOperation);
router.get('/', operationController.getOperations);
router.put('/:id', operationController.updateOperation);
router.delete('/:id', operationController.deleteOperation);
module.exports = router;