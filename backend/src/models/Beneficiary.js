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

  async create({ name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes }) {
    const [result] = await db.query(
      `INSERT INTO beneficiaries
         (name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, species || 'Cachorro', breed || null, sex || 'Não identificado', size || null,
       birth_date || null, status || 'disponivel', responsible_name || null, responsible_phone || null, notes || null]
    );
    return result.insertId;
  },

  async update(id, { name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes }) {
    await db.query(
      `UPDATE beneficiaries SET
         name=?, species=?, breed=?, sex=?, size=?, birth_date=?,
         status=?, responsible_name=?, responsible_phone=?, notes=?
       WHERE id=?`,
      [name, species || 'Cachorro', breed || null, sex || 'Não identificado', size || null,
       birth_date || null, status, responsible_name || null, responsible_phone || null, notes || null, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM beneficiaries WHERE id = ?', [id]);
  },

  async count() {
    const [[{ total }]] = await db.query(
      'SELECT COUNT(*) AS total FROM beneficiaries WHERE status != "obito"'
    );
    return total;
  }
};

module.exports = Beneficiary;
