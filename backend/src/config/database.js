const { Pool } = require('pg');

const url = new URL(process.env.DATABASE_URL);

const pool = new Pool({
  host: url.hostname,
  port: parseInt(url.port) || 5432,
  database: url.pathname.slice(1),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  async query(text, params) {
    const { rows } = await pool.query(text, params);
    return rows;
  }
};
