const {pool} = require('../config/db');

module.exports = {
  //obtenir tout les  organisation
// Get all organisations
getAllOrganisation: async (req, res) => {
  try {
    const organisations = await prisma.organisation.findMany();
    console.log(organisations);
    res.json(organisations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Get organisation by ID
getOrganisationById: async (req, res) => {
  try {
    const { id } = req.params;
    const organisation = await prisma.organisation.findUnique({
      where: { id: parseInt(id) },
    });
    if (!organisation) {
      return res.status(404).json({ error: 'organisation non trouvé' });
    }
    res.json(organisation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Create a new organisation
createOrganisation: async (req, res) => {
  try {
    const { nom, description } = req.body;
    const newOrganisation = await prisma.organisation.create({
      data: {
        nom,
        description,
      },
    });
    res.status(201).json(newOrganisation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Update an organisation
updateOrganisation: async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;
    const updatedOrganisation = await prisma.organisation.update({
      where: { id: parseInt(id) },
      data: {
        nom,
        description,
      },
    });
    if (!updatedOrganisation) {
      return res.status(404).json({ error: 'organisation non trouvé' });
    }
    res.json(updatedOrganisation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Delete an organisation
deleteOrganisation: async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.organisation.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'organisation non trouvé' });
    }
    res.status(500).json({ error: error.message });
  }
}


}


