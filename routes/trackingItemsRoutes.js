const express = require('express');
const router = express.Router();
const trackingItemsController = require('../controllers/trackingItemsController');

router.post('/', trackingItemsController.createTrackingItem);
router.get('/', trackingItemsController.getTrackingItems);
router.put('/:id', trackingItemsController.updateTrackingItem);
router.delete('/:id', trackingItemsController.deleteTrackingItem);

module.exports = router;