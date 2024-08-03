// src/config/db.js

const { PrismaClient } = require('@prisma/client');

// Instantiate the Prisma client
const prisma = new PrismaClient();


const { Pool } = require('pg');

// Configure your database connection
const pool = new Pool({
  user: 'postgres',         // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'recrutement', // Replace with your PostgreSQL database name
  password: 'adminumb',     // Replace with your PostgreSQL password
  port: 5432,               // Default PostgreSQL port
});

const testDbConnection = async () => {
    try {
      await pool.query('SELECT NOW()');
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error.message);
      process.exit(1); // Exit the process with an error code
    }
  };
  

module.exports = {pool,testDbConnection,prisma};