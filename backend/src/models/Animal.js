const db = require('../config/database');

const Animal = {
  async findAll({ page = 1, limit = 20, species, status, size, search } = {}) {
    const conditions = [];
    const params = [];

    const toArr = v => v ? v.split(',').filter(Boolean) : [];
    const arr = { species: toArr(species), status: toArr(status), size: toArr(size) };

    if (arr.species.length) { conditions.push(`species = ANY($${params.length + 1})`);  params.push(arr.species); }
    if (arr.status.length)  { conditions.push(`status = ANY($${params.length + 1})`);   params.push(arr.status); }
    if (arr.size.length)    { conditions.push(`size = ANY($${params.length + 1})`);     params.push(arr.size); }
    if (search)             { conditions.push(`name ILIKE $${params.length + 1}`);      params.push(`%${search}%`); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const countRows = await db.query(`SELECT COUNT(*) AS total FROM animals ${where}`, params);
    const total  = Number(countRows[0].total);
    const offset = (Number(page) - 1) * Number(limit);

    const data = await db.query(
      `SELECT * FROM animals ${where} ORDER BY name LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, Number(limit), offset]
    );

    return { data, total, page: Number(page), pages: Math.ceil(total / Number(limit)) };
  },

  async findById(id) {
    const rows = await db.query('SELECT * FROM animals WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async create({ name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes }) {
    const rows = await db.query(
      `INSERT INTO animals
         (name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [name, species || 'Cachorro', breed || null, sex || 'Não identificado', size || null,
       birth_date || null, status || 'disponivel', responsible_name || null, responsible_phone || null, notes || null]
    );
    return rows[0].id;
  },

  async update(id, { name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes }) {
    await db.query(
      `UPDATE animals SET
         name=$1, species=$2, breed=$3, sex=$4, size=$5, birth_date=$6,
         status=$7, responsible_name=$8, responsible_phone=$9, notes=$10
       WHERE id=$11`,
      [name, species || 'Cachorro', breed || null, sex || 'Não identificado', size || null,
       birth_date || null, status, responsible_name || null, responsible_phone || null, notes || null, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM animals WHERE id = $1', [id]);
  },

  async count() {
    const rows = await db.query("SELECT COUNT(*) AS total FROM animals WHERE status != 'obito'");
    return Number(rows[0].total);
  },

  async countBySpecies() {
    return db.query(
      "SELECT species, COUNT(*) AS total FROM animals WHERE status != 'obito' GROUP BY species ORDER BY total DESC"
    );
  },

  async countByAdoptionStatus() {
    return db.query(
      'SELECT status, COUNT(*) AS total FROM animals GROUP BY status ORDER BY total DESC'
    );
  }
};

module.exports = Animal;
