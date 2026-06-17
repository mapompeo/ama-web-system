const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  async findByEmail(email) {
    const rows = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] || null;
  },

  async create({ name, email, password, role = 'volunteer' }) {
    const hash = await bcrypt.hash(password, 10);
    const rows = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, hash, role]
    );
    return rows[0].id;
  },

  async comparePassword(plain, hash) {
    return bcrypt.compare(plain, hash);
  }
};

module.exports = User;
