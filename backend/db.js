// backend/db.js
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Create a new Pool instance (database connection pool)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;

