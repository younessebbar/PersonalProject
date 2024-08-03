const offreEmploiController = require('../controllers/offre_emploi_controller');
const express = require('express');
const router = express.Router();


router.get('/',offreEmploiController.getAllOffreEmploi);
router.get('/:id',offreEmploiController.getOfferEmploiByID);
router.post('/',offreEmploiController.createOffreEmploi);
router.put('/:id',offreEmploiController.updateOffreEmploi);
router.delete('/:id',offreEmploiController.deleteOffreEmploi);

module.exports = router;
