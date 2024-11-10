const express = require('express');
const router = express.Router();
const relatedOperationController = require('../controllers/relatedOperationController');

router.post('/', relatedOperationController.createRelatedOperation);
router.get('/', relatedOperationController.getRelatedOperations);
router.get('/:id', relatedOperationController.getRelatedOperation);
router.put('/:id', relatedOperationController.updateRelatedOperation);
router.delete('/:id', relatedOperationController.deleteRelatedOperation);

module.exports = router;