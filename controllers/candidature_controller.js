const {pool} = require('../config/db');

module.exports = {

    //obtenir tous les candidatures
   // Get all candidatures
getAllCandidatures: async (req, res) => {
  try {
    const candidatures = await prisma.candidature.findMany();
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Get candidature by ID
getCandidatureById: async (req, res) => {
  try {
    const { id } = req.params;
    const candidature = await prisma.candidature.findUnique({
      where: { id: parseInt(id) },
    });
    if (!candidature) {
      return res.status(404).json({ error: 'Candidature non trouvée' });
    }
    res.json(candidature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Create a new candidature
createCandidature: async (req, res) => {
  try {
    const { date_candidature, education, experience, autres_informations, emploi_id, candidat_id, statut } = req.body;
    const newCandidature = await prisma.candidature.create({
      data: {
        date_candidature,
        education,
        experience,
        autres_informations,
        emploi_id,
        candidat_id,
        statut,
      },
    });
    res.status(201).json(newCandidature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Update a candidature
updateCandidature: async (req, res) => {
  try {
    const { id } = req.params;
    const { date_candidature, education, experience, autres_informations, emploi_id, candidat_id, statut } = req.body;
    const updatedCandidature = await prisma.candidature.update({
      where: { id: parseInt(id) },
      data: {
        date_candidature,
        education,
        experience,
        autres_informations,
        emploi_id,
        candidat_id,
        statut,
      },
    });
    if (!updatedCandidature) {
      return res.status(404).json({ error: 'Candidature non trouvée' });
    }
    res.json(updatedCandidature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Delete a candidature
deleteCandidature: async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.candidature.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Candidature non trouvée' });
    }
    res.status(500).json({ error: error.message });
  }
}

    


}

