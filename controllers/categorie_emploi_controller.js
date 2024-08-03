const {pool} = require('../config/db');

module.exports = {
  // Get all categories
getAllCategorie: async (req, res) => {
  try {
    const categories = await prisma.categorie_emploi.findMany();
    console.log(categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Get category by ID
getCategorieById: async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await prisma.categorie_emploi.findUnique({
      where: { id: parseInt(id) },
    });
    if (!categorie) {
      return res.status(404).json({ error: 'categorie emploi non trouvée' });
    }
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Create a new category
createCategorie: async (req, res) => {
  try {
    const { code, nom, description } = req.body;
    const newCategorie = await prisma.categorie_emploi.create({
      data: {
        code,
        nom,
        description,
      },
    });
    res.status(201).json(newCategorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Update a category
updateCategorie: async (req, res) => {
  try {
    const { id } = req.params;
    const { code, nom, description } = req.body;
    const updatedCategorie = await prisma.categorie_emploi.update({
      where: { id: parseInt(id) },
      data: {
        code,
        nom,
        description,
      },
    });
    if (!updatedCategorie) {
      return res.status(404).json({ error: 'categorie emploi non trouvée' });
    }
    res.json(updatedCategorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Delete a category
deleteCategorie: async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.categorie_emploi.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'categorie emploi non trouvée' });
    }
    res.status(500).json({ error: error.message });
  }
}

}


