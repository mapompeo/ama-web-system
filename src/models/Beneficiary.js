const db = require('../config/database');

const Beneficiary = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM beneficiaries ORDER BY name');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM beneficiaries WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({ name, cpf, birth_date, phone, address, responsible_name, status }) {
    const [result] = await db.query(
      'INSERT INTO beneficiaries (name, cpf, birth_date, phone, address, responsible_name, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, cpf, birth_date || null, phone, address, responsible_name, status || 'ativo']
    );
    return result.insertId;
  },

  async update(id, { name, cpf, birth_date, phone, address, responsible_name, status }) {
    await db.query(
      'UPDATE beneficiaries SET name=?, cpf=?, birth_date=?, phone=?, address=?, responsible_name=?, status=? WHERE id=?',
      [name, cpf, birth_date || null, phone, address, responsible_name, status, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM beneficiaries WHERE id = ?', [id]);
  },

  async count() {
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM beneficiaries WHERE status = "ativo"');
    return total;
  }
};

module.exports = Beneficiary;
