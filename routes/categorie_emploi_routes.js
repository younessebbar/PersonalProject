const categorieEmploiController = require('../controllers/categorie_emploi_controller');
const express = require('express');
const router = express.Router();


router.get('/',categorieEmploiController.getAllCategorie);
router.get('/:id',categorieEmploiController.getCategorieById);
router.post('/',categorieEmploiController.createCategorie);
router.put('/:id',categorieEmploiController.updateCategorie);
router.delete('/:id',categorieEmploiController.deleteCategorie);

module.exports = router;
