const organisationController = require('../controllers/organisation_controller');
const express = require('express');
const router = express.Router();


router.get('/',organisationController.getAllOrganisation);
router.get('/:id',organisationController.getOrganisationById);
router.post('/',organisationController.createOrganisation);
router.put('/:id',organisationController.updateOrganisation);
router.delete('/:id',organisationController.deleteOrganisation);

module.exports = router;
