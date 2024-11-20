const express = require('express');
const router = express.Router();
const consumptionController = require('../controllers/consumptionController');

router.post('/', consumptionController.createConsumption);
router.get('/', consumptionController.getConsumptions);
router.get('/:idPurchaseItemStory', consumptionController.getConsumptionsByPurchaseItemStory);
router.put('/:id', consumptionController.updateConsumption);
router.delete('/:id', consumptionController.deleteConsumption);

module.exports = router;
