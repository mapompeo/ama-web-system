const db = require('../config/database');

const Activity = {
  async findAll({ search, status, owner_id } = {}) {
    const params = [];
    const conditions = ['1=1'];

    if (owner_id) { conditions.push(`owner_id = $${params.length + 1}`); params.push(owner_id); }

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(title ILIKE $${params.length} OR location ILIKE $${params.length} OR description ILIKE $${params.length})`);
    }
    if (status) {
      const statuses = status.split(',');
      const placeholders = statuses.map((_, i) => `$${params.length + i + 1}`);
      conditions.push(`status IN (${placeholders.join(',')})`);
      params.push(...statuses);
    }
    const sql = `SELECT * FROM activities WHERE ${conditions.join(' AND ')} ORDER BY activity_date DESC`;
    return db.query(sql, params);
  },

  async findById(id, owner_id) {
    const params = [id];
    let sql = 'SELECT * FROM activities WHERE id = $1';
    if (owner_id) { sql += ' AND owner_id = $2'; params.push(owner_id); }
    const rows = await db.query(sql, params);
    return rows[0] || null;
  },

  async create({ title, description, activity_date, location, status, owner_id }) {
    const rows = await db.query(
      'INSERT INTO activities (title, description, activity_date, location, status, owner_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id',
      [title, description || null, activity_date, location || null, status || 'agendada', owner_id || null]
    );
    return rows[0].id;
  },

  async update(id, { title, description, activity_date, location, status }, owner_id) {
    await db.query(
      'UPDATE activities SET title=$1, description=$2, activity_date=$3, location=$4, status=$5 WHERE id=$6 AND owner_id=$7',
      [title, description || null, activity_date, location || null, status, id, owner_id]
    );
  },

  async delete(id, owner_id) {
    await db.query('DELETE FROM activities WHERE id = $1 AND owner_id = $2', [id, owner_id]);
  },

  async countUpcoming(owner_id) {
    const params = owner_id ? [owner_id] : [];
    const ownerClause = owner_id ? 'AND owner_id = $1' : '';
    const rows = await db.query(
      `SELECT COUNT(*) AS total FROM activities WHERE status = 'agendada' AND activity_date >= CURRENT_DATE ${ownerClause}`,
      params
    );
    return Number(rows[0].total);
  },

  async findRecent(limit = 5, owner_id) {
    const params = owner_id ? [owner_id, limit] : [limit];
    const ownerClause = owner_id ? 'WHERE owner_id = $1' : '';
    const limitParam  = owner_id ? '$2' : '$1';
    return db.query(`SELECT * FROM activities ${ownerClause} ORDER BY activity_date DESC LIMIT ${limitParam}`, params);
  },

  async findUpcoming(limit = 5, owner_id) {
    const params = owner_id ? [owner_id, limit] : [limit];
    const ownerClause = owner_id ? 'AND owner_id = $1' : '';
    const limitParam  = owner_id ? '$2' : '$1';
    return db.query(
      `SELECT * FROM activities WHERE status = 'agendada' AND activity_date >= CURRENT_DATE ${ownerClause} ORDER BY activity_date ASC LIMIT ${limitParam}`,
      params
    );
  },

  async countByStatus(owner_id) {
    const params = owner_id ? [owner_id] : [];
    const ownerClause = owner_id ? 'WHERE owner_id = $1' : '';
    const rows = await db.query(`SELECT status, COUNT(*) AS total FROM activities ${ownerClause} GROUP BY status`, params);
    const result = { agendada: 0, realizada: 0, cancelada: 0 };
    rows.forEach(r => { result[r.status] = Number(r.total); });
    return result;
  },

  async countByMonth(year, owner_id) {
    const params = owner_id ? [year, owner_id] : [year];
    const ownerClause = owner_id ? 'AND owner_id = $2' : '';
    const rows = await db.query(
      `SELECT EXTRACT(MONTH FROM activity_date) AS month, COUNT(*) AS total
       FROM activities WHERE EXTRACT(YEAR FROM activity_date) = $1 ${ownerClause}
       GROUP BY EXTRACT(MONTH FROM activity_date)`,
      params
    );
    const data = Array(12).fill(0);
    rows.forEach(r => { data[Number(r.month) - 1] = Number(r.total); });
    return data;
  }
};

module.exports = Activity;
