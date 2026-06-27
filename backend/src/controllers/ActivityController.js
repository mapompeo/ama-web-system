const Activity = require('../models/Activity');

module.exports = {
  async index(req, res) {
    try {
      const { search, status } = req.query;
      res.json(await Activity.findAll({ search, status, owner_id: req.user.id }));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar atividades.' });
    }
  },

  async show(req, res) {
    try {
      const a = await Activity.findById(req.params.id, req.user.id);
      if (!a) return res.status(404).json({ error: 'Atividade não encontrada.' });
      res.json(a);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar atividade.' });
    }
  },

  async create(req, res) {
    try {
      const { title, activity_date } = req.body;
      if (!title?.trim())   return res.status(400).json({ error: 'Título é obrigatório.' });
      if (!activity_date)   return res.status(400).json({ error: 'Data é obrigatória.' });
      const id = await Activity.create({ ...req.body, owner_id: req.user.id });
      res.status(201).json(await Activity.findById(id, req.user.id));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao cadastrar atividade.' });
    }
  },

  async update(req, res) {
    try {
      const { title, activity_date } = req.body;
      if (!title?.trim())   return res.status(400).json({ error: 'Título é obrigatório.' });
      if (!activity_date)   return res.status(400).json({ error: 'Data é obrigatória.' });
      await Activity.update(req.params.id, req.body, req.user.id);
      const updated = await Activity.findById(req.params.id, req.user.id);
      if (!updated) return res.status(404).json({ error: 'Atividade não encontrada.' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar atividade.' });
    }
  },

  async destroy(req, res) {
    try {
      const activity = await Activity.findById(req.params.id, req.user.id);
      if (!activity) return res.status(404).json({ error: 'Atividade não encontrada.' });
      await Activity.delete(req.params.id, req.user.id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover atividade.' });
    }
  }
};
