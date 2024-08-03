const express = require('express')
const app = express();
const cors = require('cors');

//ROUTES
const categorieEmploieRoutes = require('./routes/categorie_emploi_routes');
const posteRoutes = require('./routes/poste_routes');
const organisationRoutes = require('./routes/organisation_routes');
const candidatRoutes = require('./routes/candidat_routes');
const recruteurRoutes = require('./routes/recruteur_routes');
const offreEmploiRoutes = require('./routes/offre_emploi_routes');

//TEST CONNECTION DB
const {testDbConnection} = require('./config/db');


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

testDbConnection();



app.use('/api/categorieemploi',categorieEmploieRoutes);
app.use('/api/poste',posteRoutes);
app.use('/api/organisation',organisationRoutes);
app.use('/api/candidat',candidatRoutes);
app.use('/api/recruteur',recruteurRoutes);
app.use('/api/offreemploi',offreEmploiRoutes);

const port = 3000;

app.listen(port,()=> {

    console.log('server up on port 3000')
})