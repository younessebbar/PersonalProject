const {pool} = require('../config/db');

module.exports = {
// Get all recruiters
getAllRecruteur: async (req, res) => {
  try {
    const recruteurs = await prisma.recruteur.findMany();
    console.log(recruteurs);
    res.json(recruteurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Get recruiter by ID
getRecruteurById: async (req, res) => {
  try {
    const { id } = req.params;
    const recruteur = await prisma.recruteur.findUnique({
      where: { id: parseInt(id) },
    });
    if (!recruteur) {
      return res.status(404).json({ error: 'Recruteur non trouvé' });
    }
    res.json(recruteur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Create a new recruiter
createRecruteur: async (req, res) => {
  try {
    const { nom, prenom } = req.body;
    const newRecruteur = await prisma.recruteur.create({
      data: {
        nom,
        prenom,
      },
    });
    res.status(201).json(newRecruteur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Update a recruiter
updateRecruteur: async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom } = req.body;
    const updatedRecruteur = await prisma.recruteur.update({
      where: { id: parseInt(id) },
      data: {
        nom,
        prenom,
      },
    });
    if (!updatedRecruteur) {
      return res.status(404).json({ error: 'Recruteur non trouvé' });
    }
    res.json(updatedRecruteur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Delete a recruiter
deleteRecruteur: async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.recruteur.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Recruteur non trouvé' });
    }
    res.status(500).json({ error: error.message });
  }
}


}


