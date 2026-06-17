const { Pool } = require('pg');
const dns = require('dns');

const url = new URL(process.env.DATABASE_URL);

let pool;

function getPool() {
  if (pool) return Promise.resolve(pool);
  return new Promise((resolve, reject) => {
    dns.resolve4(url.hostname, (err, addresses) => {
      if (err) return reject(err);
      pool = new Pool({
        host: addresses[0],
        port: parseInt(url.port) || 5432,
        database: url.pathname.slice(1),
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        ssl: { rejectUnauthorized: false },
      });
      resolve(pool);
    });
  });
}

module.exports = {
  async query(text, params) {
    const p = await getPool();
    const { rows } = await p.query(text, params);
    return rows;
  }
};
