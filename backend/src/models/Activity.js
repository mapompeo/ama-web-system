const db = require('../config/database');

const Activity = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM activities ORDER BY activity_date DESC');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM activities WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({ title, description, activity_date, location, status }) {
    const [result] = await db.query(
      'INSERT INTO activities (title, description, activity_date, location, status) VALUES (?, ?, ?, ?, ?)',
      [title, description, activity_date, location, status || 'agendada']
    );
    return result.insertId;
  },

  async update(id, { title, description, activity_date, location, status }) {
    await db.query(
      'UPDATE activities SET title=?, description=?, activity_date=?, location=?, status=? WHERE id=?',
      [title, description, activity_date, location, status, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM activities WHERE id = ?', [id]);
  },

  async countUpcoming() {
    const [[{ total }]] = await db.query(
      'SELECT COUNT(*) AS total FROM activities WHERE status = "agendada" AND activity_date >= CURDATE()'
    );
    return total;
  },

  async findRecent(limit = 5) {
    const [rows] = await db.query(
      'SELECT * FROM activities ORDER BY activity_date DESC LIMIT ?', [limit]
    );
    return rows;
  },

  async findUpcoming(limit = 5) {
    const [rows] = await db.query(
      `SELECT * FROM activities
       WHERE status = 'agendada' AND activity_date >= CURDATE()
       ORDER BY activity_date ASC LIMIT ?`,
      [limit]
    );
    return rows;
  },

  async countByStatus() {
    const [rows] = await db.query(
      `SELECT status, COUNT(*) AS total FROM activities GROUP BY status`
    );
    const result = { agendada: 0, realizada: 0, cancelada: 0 };
    rows.forEach(r => { result[r.status] = r.total; });
    return result;
  },

  async countByMonth(year) {
    const [rows] = await db.query(
      `SELECT MONTH(activity_date) AS month, COUNT(*) AS total
       FROM activities WHERE YEAR(activity_date) = ?
       GROUP BY MONTH(activity_date)`,
      [year]
    );
    const data = Array(12).fill(0);
    rows.forEach(r => { data[r.month - 1] = r.total; });
    return data;
  }
};

module.exports = Activity;
