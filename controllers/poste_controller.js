const {pool} = require('../config/db');

module.exports = {
  //obtenir tout les poste
    getAllPoste : async(req,res)=> {

        try {
            const result = await pool.query('SELECT * FROM poste');
            console.log(result.rows)
            res.json(result.rows);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }

    },
    //obtenir un poste par ID
    getPosteById : async(req,res)=> {

      try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM poste WHERE id = $1', [id]);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'poste non trouvé' });
        }
        res.json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    },
    // Créer une nouvell poste
    createPoste : async (req, res) => {
      try {
        const { code, nom, description } = req.body;
        const result = await pool.query(
          `INSERT INTO poste (code, nom, description) VALUES ($1, $2, $3 ) RETURNING *`,
          [code, nom, description]
        );
      res.status(201).json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    // Mettre à jour un poste
    updatePoste : async (req, res) => {
        try {
          const { id } = req.params;
          const { code, nom, description} = req.body;
          const result = await pool.query(
            `UPDATE poste SET code = $1, nom = $2, description = $3  WHERE id = $4 RETURNING *`,
            [code, nom, description, id]
          );
          if (result.rows.length === 0) {
            return res.status(404).json({ error: 'poste non trouvé' });
          }
          res.json(result.rows[0]);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      //supprimer un poste
    deletePoste : async (req, res) => {
      try {
        const { id } = req.params;
        await pool.query('DELETE FROM poste WHERE id = $1', [id]);
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }


}


