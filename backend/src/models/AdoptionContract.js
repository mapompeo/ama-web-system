const db = require('../config/database');

const AdoptionContract = {
  async findByAnimal(animalId) {
    return db.query(
      'SELECT * FROM adoption_contracts WHERE animal_id = $1 ORDER BY uploaded_at DESC',
      [animalId]
    );
  },

  async findById(id) {
    const rows = await db.query('SELECT * FROM adoption_contracts WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async create({ animal_id, filename, original_name }) {
    const rows = await db.query(
      `INSERT INTO adoption_contracts (animal_id, filename, original_name)
       VALUES ($1, $2, $3) RETURNING id`,
      [animal_id, filename, original_name]
    );
    return rows[0].id;
  },

  async delete(id) {
    const rows = await db.query(
      'DELETE FROM adoption_contracts WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0] || null;
  }
};

module.exports = AdoptionContract;
