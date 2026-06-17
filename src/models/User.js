const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async create({ name, email, password, role = 'volunteer' }) {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hash, role]
    );
    return result.insertId;
  },

  async comparePassword(plain, hash) {
    return bcrypt.compare(plain, hash);
  }
};

module.exports = User;
