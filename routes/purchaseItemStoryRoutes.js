const express = require('express');
const router = express.Router();
const purchaseItemStoryController = require('../controllers/purchaseItemStoryController');

router.post('/', purchaseItemStoryController.createPurchaseItemStory);
router.get('/', purchaseItemStoryController.getPurchaseItemStories);
router.get('/:id', purchaseItemStoryController.getPurchaseItemStoryById);
router.put('/:id', purchaseItemStoryController.updatePurchaseItemStory);
router.delete('/:id', purchaseItemStoryController.deletePurchaseItemStory);

module.exports = router;