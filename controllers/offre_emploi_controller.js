const {pool} = require('../config/db');

module.exports = {

   // Get all job offers
getAllOffreEmploi: async (req, res) => {
  try {
    const offers = await prisma.offre_emploi.findMany();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Get job offer by ID
getOfferEmploiByID: async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await prisma.offre_emploi.findUnique({
      where: { id: parseInt(id) },
    });
    if (!offer) {
      return res.status(404).json({ error: 'Offre Emploi non trouvé' });
    }
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Create a new job offer
createOffreEmploi: async (req, res) => {
  try {
    const { nom, description, date_publication, date_debut, nombre_vacances, salaire_min, salaire_max, type_contrat, categorie_emploi_id, poste_id, organisation_id } = req.body;
    const newOffer = await prisma.offre_emploi.create({
      data: {
        nom,
        description,
        date_publication,
        date_debut,
        nombre_vacances,
        salaire_min,
        salaire_max,
        type_contrat,
        categorie_emploi_id,
        poste_id,
        organisation_id,
      },
    });
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Update a job offer
updateOffreEmploi: async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, date_publication, date_debut, nombre_vacances, salaire_min, salaire_max, type_contrat, categorie_emploi_id, poste_id, organisation_id } = req.body;
    const updatedOffer = await prisma.offre_emploi.update({
      where: { id: parseInt(id) },
      data: {
        nom,
        description,
        date_publication,
        date_debut,
        nombre_vacances,
        salaire_min,
        salaire_max,
        type_contrat,
        categorie_emploi_id,
        poste_id,
        organisation_id,
      },
    });
    if (!updatedOffer) {
      return res.status(404).json({ error: 'Emploi non trouvé' });
    }
    res.json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Delete a job offer
deleteOffreEmploi: async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.offre_emploi.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Offre Emploi non trouvé' });
    }
    res.status(500).json({ error: error.message });
  }
}
      
  
}