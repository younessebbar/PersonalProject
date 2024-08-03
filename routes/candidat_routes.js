const candidatController = require('../controllers/candidat_controller');
const express = require('express');
const router = express.Router();


router.get('/',candidatController.getAllCandidat);
router.get('/:id',candidatController.getCandidatById);
router.post('/',candidatController.createCandidat);
router.put('/:id',candidatController.updateCandidat);
router.delete('/:id',candidatController.deleteCandidat);

module.exports = router;




