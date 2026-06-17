const db = require('../config/database');

const AnimalRecord = {
  async findByAnimal(animal_id) {
    return db.query(
      'SELECT * FROM animal_records WHERE animal_id = $1 ORDER BY record_date DESC, created_at DESC',
      [animal_id]
    );
  },

  async create({ animal_id, title, description, record_date }) {
    const rows = await db.query(
      'INSERT INTO animal_records (animal_id, title, description, record_date) VALUES ($1,$2,$3,$4) RETURNING id',
      [animal_id, title, description || null, record_date]
    );
    return rows[0].id;
  },

  async delete(id) {
    await db.query('DELETE FROM animal_records WHERE id = $1', [id]);
  }
};

module.exports = AnimalRecord;
