const express = require('express');
const router = express.Router();
const param_configController = require('../controllers/param_configController');

router.post('/', param_configController.createParam_config);
router.get('/', param_configController.getParam_config);
router.get('/:id', param_configController.getParam_configById);
router.put('/:id', param_configController.updateParam_config);
router.delete('/:id', param_configController.deleteParam_config);

module.exports = router;
