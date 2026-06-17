const AnimalRecord = require('../models/AnimalRecord');
const Beneficiary  = require('../models/Beneficiary');

module.exports = {
  async index(req, res) {
    try {
      const { animal_id } = req.query;
      if (!animal_id) return res.status(400).json({ error: 'animal_id é obrigatório.' });
      const animal = await Beneficiary.findById(animal_id);
      if (!animal) return res.status(404).json({ error: 'Animal não encontrado.' });
      const records = await AnimalRecord.findByAnimal(animal_id);
      res.json({ animal, records });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar histórico.' });
    }
  },

  async create(req, res) {
    try {
      const { animal_id, title, record_date } = req.body;
      if (!animal_id) return res.status(400).json({ error: 'animal_id é obrigatório.' });
      if (!title?.trim()) return res.status(400).json({ error: 'Título é obrigatório.' });
      if (!record_date) return res.status(400).json({ error: 'Data é obrigatória.' });
      const id = await AnimalRecord.create(req.body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao adicionar registro.' });
    }
  },

  async destroy(req, res) {
    try {
      await AnimalRecord.delete(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover registro.' });
    }
  }
};
