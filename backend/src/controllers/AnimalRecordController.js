const AnimalRecord = require('../models/AnimalRecord');
const Animal = require('../models/Animal');

module.exports = {
  async index(req, res) {
    try {
      const { animal_id } = req.query;
      if (!animal_id) return res.status(400).json({ error: 'animal_id é obrigatório.' });
      const animal = await Animal.findById(animal_id, req.user.id);
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
      const animal = await Animal.findById(animal_id, req.user.id);
      if (!animal) return res.status(404).json({ error: 'Animal não encontrado.' });
      const id = await AnimalRecord.create(req.body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao adicionar registro.' });
    }
  },

  async update(req, res) {
    try {
      const { title, record_date } = req.body;
      if (!title?.trim()) return res.status(400).json({ error: 'Título é obrigatório.' });
      if (!record_date) return res.status(400).json({ error: 'Data é obrigatória.' });
      // Verificar ownership do animal pai
      const db = require('../config/database');
      const rows = await db.query('SELECT animal_id FROM animal_records WHERE id = $1', [req.params.id]);
      if (!rows[0]) return res.status(404).json({ error: 'Registro não encontrado.' });
      const animal = await Animal.findById(rows[0].animal_id, req.user.id);
      if (!animal) return res.status(404).json({ error: 'Animal não encontrado.' });
      const id = await AnimalRecord.update(req.params.id, req.body);
      if (!id) return res.status(404).json({ error: 'Registro não encontrado.' });
      res.json({ id });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
  },

  async destroy(req, res) {
    try {
      const db = require('../config/database');
      const rows = await db.query('SELECT animal_id FROM animal_records WHERE id = $1', [req.params.id]);
      if (!rows[0]) return res.status(404).json({ error: 'Registro não encontrado.' });
      const animal = await Animal.findById(rows[0].animal_id, req.user.id);
      if (!animal) return res.status(404).json({ error: 'Animal não encontrado.' });
      await AnimalRecord.delete(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover registro.' });
    }
  }
};
