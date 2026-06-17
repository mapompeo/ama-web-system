const db = require('../config/database');

const Activity = {
  async findAll() {
    return db.query('SELECT * FROM activities ORDER BY activity_date DESC');
  },

  async findById(id) {
    const rows = await db.query('SELECT * FROM activities WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async create({ title, description, activity_date, location, status }) {
    const rows = await db.query(
      'INSERT INTO activities (title, description, activity_date, location, status) VALUES ($1,$2,$3,$4,$5) RETURNING id',
      [title, description || null, activity_date, location || null, status || 'agendada']
    );
    return rows[0].id;
  },

  async update(id, { title, description, activity_date, location, status }) {
    await db.query(
      'UPDATE activities SET title=$1, description=$2, activity_date=$3, location=$4, status=$5 WHERE id=$6',
      [title, description || null, activity_date, location || null, status, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM activities WHERE id = $1', [id]);
  },

  async countUpcoming() {
    const rows = await db.query(
      "SELECT COUNT(*) AS total FROM activities WHERE status = 'agendada' AND activity_date >= CURRENT_DATE"
    );
    return Number(rows[0].total);
  },

  async findRecent(limit = 5) {
    return db.query('SELECT * FROM activities ORDER BY activity_date DESC LIMIT $1', [limit]);
  },

  async findUpcoming(limit = 5) {
    return db.query(
      "SELECT * FROM activities WHERE status = 'agendada' AND activity_date >= CURRENT_DATE ORDER BY activity_date ASC LIMIT $1",
      [limit]
    );
  },

  async countByStatus() {
    const rows = await db.query('SELECT status, COUNT(*) AS total FROM activities GROUP BY status');
    const result = { agendada: 0, realizada: 0, cancelada: 0 };
    rows.forEach(r => { result[r.status] = Number(r.total); });
    return result;
  },

  async countByMonth(year) {
    const rows = await db.query(
      `SELECT EXTRACT(MONTH FROM activity_date) AS month, COUNT(*) AS total
       FROM activities WHERE EXTRACT(YEAR FROM activity_date) = $1
       GROUP BY EXTRACT(MONTH FROM activity_date)`,
      [year]
    );
    const data = Array(12).fill(0);
    rows.forEach(r => { data[Number(r.month) - 1] = Number(r.total); });
    return data;
  }
};

module.exports = Activity;
