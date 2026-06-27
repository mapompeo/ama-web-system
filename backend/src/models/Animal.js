const db = require('../config/database');

const Animal = {
  async findAll({ page = 1, limit = 20, species, status, size, search, sortBy, order, owner_id } = {}) {
    const conditions = [];
    const params = [];

    if (owner_id) { conditions.push(`owner_id = $${params.length + 1}`); params.push(owner_id); }

    const toArr = v => v ? v.split(',').filter(Boolean) : [];
    const arr = { species: toArr(species), status: toArr(status), size: toArr(size) };

    if (arr.species.length) { conditions.push(`species = ANY($${params.length + 1})`);  params.push(arr.species); }
    if (arr.status.length)  { conditions.push(`status = ANY($${params.length + 1})`);   params.push(arr.status); }
    if (arr.size.length)    { conditions.push(`size = ANY($${params.length + 1})`);     params.push(arr.size); }
    if (search)             { conditions.push(`name ILIKE $${params.length + 1}`);      params.push(`%${search}%`); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const ALLOWED_SORT = { id: 'id', name: 'name', species: 'species', sex: 'sex', size: 'size', responsible_name: 'responsible_name', status: 'status' };
    const col = ALLOWED_SORT[sortBy] || 'name';
    const dir = order === 'desc' ? 'DESC' : 'ASC';

    const countRows = await db.query(`SELECT COUNT(*) AS total FROM animals ${where}`, params);
    const total  = Number(countRows[0].total);
    const offset = (Number(page) - 1) * Number(limit);

    const data = await db.query(
      `SELECT * FROM animals ${where} ORDER BY ${col} ${dir} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, Number(limit), offset]
    );

    return { data, total, page: Number(page), pages: Math.ceil(total / Number(limit)) };
  },

  async findById(id, owner_id) {
    const params = [id];
    let sql = 'SELECT * FROM animals WHERE id = $1';
    if (owner_id) { sql += ' AND owner_id = $2'; params.push(owner_id); }
    const rows = await db.query(sql, params);
    return rows[0] || null;
  },

  async create({ name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes, owner_id }) {
    const rows = await db.query(
      `INSERT INTO animals
         (name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes, owner_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
      [name, species || 'Cachorro', breed || null, sex || 'Não identificado', size || null,
       birth_date || null, status || 'disponivel', responsible_name || null, responsible_phone || null,
       notes || null, owner_id || null]
    );
    return rows[0].id;
  },

  async update(id, { name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes }, owner_id) {
    await db.query(
      `UPDATE animals SET
         name=$1, species=$2, breed=$3, sex=$4, size=$5, birth_date=$6,
         status=$7, responsible_name=$8, responsible_phone=$9, notes=$10
       WHERE id=$11 AND owner_id=$12`,
      [name, species || 'Cachorro', breed || null, sex || 'Não identificado', size || null,
       birth_date || null, status, responsible_name || null, responsible_phone || null,
       notes || null, id, owner_id]
    );
  },

  async delete(id, owner_id) {
    await db.query('DELETE FROM animals WHERE id = $1 AND owner_id = $2', [id, owner_id]);
  },

  async count(owner_id) {
    const params = owner_id ? [owner_id] : [];
    const where  = owner_id ? "AND owner_id = $1" : '';
    const rows = await db.query(`SELECT COUNT(*) AS total FROM animals WHERE status != 'obito' ${where}`, params);
    return Number(rows[0].total);
  },

  async countBySpecies(owner_id) {
    const params = owner_id ? [owner_id] : [];
    const where  = owner_id ? "AND owner_id = $1" : '';
    return db.query(
      `SELECT species, COUNT(*) AS total FROM animals WHERE status != 'obito' ${where} GROUP BY species ORDER BY total DESC`,
      params
    );
  },

  async countByAdoptionStatus(owner_id) {
    const params = owner_id ? [owner_id] : [];
    const where  = owner_id ? "WHERE owner_id = $1" : '';
    return db.query(`SELECT status, COUNT(*) AS total FROM animals ${where} GROUP BY status ORDER BY total DESC`, params);
  }
};

module.exports = Animal;
