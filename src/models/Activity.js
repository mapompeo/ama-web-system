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
  }
};

module.exports = Activity;
