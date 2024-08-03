
const recruteurController = require('../controllers/recruteur_controller');
const express = require('express');
const router = express.Router();


router.get('/',recruteurController.getAllRecruteur);
router.get('/:id',recruteurController.getRecruteurById);
router.post('/',recruteurController.createRecruteur);
router.put('/:id',recruteurController.updateRecruteur);
router.delete('/:id',recruteurController.deleteRecruteur);

module.exports = router;