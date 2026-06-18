const db = require('../config/database');

const AdoptionContract = {
  async findByAnimal(animalId) {
    const rows = await db.query('SELECT * FROM adoption_contracts WHERE animal_id = $1', [animalId]);
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

  async delete(animalId) {
    const rows = await db.query(
      'DELETE FROM adoption_contracts WHERE animal_id = $1 RETURNING filename',
      [animalId]
    );
    return rows[0] || null;
  }
};

module.exports = AdoptionContract;
