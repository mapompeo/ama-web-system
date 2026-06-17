const db = require('../config/database');

const Volunteer = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM volunteers ORDER BY name');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM volunteers WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({ name, email, phone, cpf, address, join_date, status }) {
    const [result] = await db.query(
      'INSERT INTO volunteers (name, email, phone, cpf, address, join_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, cpf, address, join_date || null, status || 'ativo']
    );
    return result.insertId;
  },

  async update(id, { name, email, phone, cpf, address, join_date, status }) {
    await db.query(
      'UPDATE volunteers SET name=?, email=?, phone=?, cpf=?, address=?, join_date=?, status=? WHERE id=?',
      [name, email, phone, cpf, address, join_date || null, status, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM volunteers WHERE id = ?', [id]);
  },

  async count() {
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM volunteers WHERE status = "ativo"');
    return total;
  }
};

module.exports = Volunteer;
