const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  family: 4,
});

module.exports = {
  async query(text, params) {
    const { rows } = await pool.query(text, params);
    return rows;
  }
};
