const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100)    NOT NULL,
        email      VARCHAR(150)    UNIQUE NOT NULL,
        position   VARCHAR(100)    NOT NULL,
        department VARCHAR(100)    NOT NULL,
        salary     NUMERIC(12, 2)  NOT NULL,
        created_at TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Database initialization failed:', err.message);
    process.exit(1);
  }
};

module.exports = { pool, initDB };
