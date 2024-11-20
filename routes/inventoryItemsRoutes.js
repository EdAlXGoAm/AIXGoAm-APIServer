const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryItemController');

router.post('/', inventoryController.createInventoryItem);
router.get('/', inventoryController.getInventoryItems);
router.get('/:id', inventoryController.getInventoryItemById);
router.put('/:id', inventoryController.updateInventoryItem);
router.delete('/:id', inventoryController.deleteInventoryItem);

module.exports = router;