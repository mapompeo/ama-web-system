const db = require('../config/database');

const Volunteer = {
  async findAll() {
    return db.query('SELECT * FROM volunteers ORDER BY name');
  },

  async findById(id) {
    const rows = await db.query('SELECT * FROM volunteers WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async create({ name, email, phone, cpf, address, join_date, status }) {
    const rows = await db.query(
      'INSERT INTO volunteers (name, email, phone, cpf, address, join_date, status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id',
      [name, email || null, phone || null, cpf || null, address || null, join_date || null, status || 'ativo']
    );
    return rows[0].id;
  },

  async update(id, { name, email, phone, cpf, address, join_date, status }) {
    await db.query(
      'UPDATE volunteers SET name=$1, email=$2, phone=$3, cpf=$4, address=$5, join_date=$6, status=$7 WHERE id=$8',
      [name, email || null, phone || null, cpf || null, address || null, join_date || null, status, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM volunteers WHERE id = $1', [id]);
  },

  async count() {
    const rows = await db.query("SELECT COUNT(*) AS total FROM volunteers WHERE status = 'ativo'");
    return Number(rows[0].total);
  }
};

module.exports = Volunteer;
