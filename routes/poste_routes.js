const posteController = require('../controllers/poste_controller');
const express = require('express');
const router = express.Router();


router.get('/',posteController.getAllPoste);
router.get('/:id',posteController.getPosteById);
router.post('/',posteController.createPoste);
router.put('/:id',posteController.updatePoste);
router.delete('/:id',posteController.deletePoste);

module.exports = router;
