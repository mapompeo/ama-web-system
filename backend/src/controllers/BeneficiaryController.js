const Beneficiary = require('../models/Beneficiary');

module.exports = {
  async index(req, res) {
    try {
      const { page = 1, limit = 20, species, status, size, search } = req.query;
      const result = await Beneficiary.findAll({ page, limit, species, status, size, search });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar animais.' });
    }
  },

  async show(req, res) {
    try {
      const b = await Beneficiary.findById(req.params.id);
      if (!b) return res.status(404).json({ error: 'Animal não encontrado.' });
      res.json(b);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar animal.' });
    }
  },

  async create(req, res) {
    try {
      const { name, status } = req.body;
      if (!name?.trim()) return res.status(400).json({ error: 'Nome é obrigatório.' });
      if (!status)       return res.status(400).json({ error: 'Status é obrigatório.' });
      const id = await Beneficiary.create(req.body);
      res.status(201).json(await Beneficiary.findById(id));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao cadastrar animal.' });
    }
  },

  async update(req, res) {
    try {
      const { name, status } = req.body;
      if (!name?.trim()) return res.status(400).json({ error: 'Nome é obrigatório.' });
      if (!status)       return res.status(400).json({ error: 'Status é obrigatório.' });
      await Beneficiary.update(req.params.id, req.body);
      res.json(await Beneficiary.findById(req.params.id));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar animal.' });
    }
  },

  async uploadPhoto(req, res) {
    try {
      if (!req.file) return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
      const photoUrl = `/uploads/animals/${req.file.filename}`;
      await Beneficiary.updatePhoto(req.params.id, photoUrl);
      res.json({ photo_url: photoUrl });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao salvar foto.' });
    }
  },

  async destroy(req, res) {
    try {
      await Beneficiary.delete(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover animal.' });
    }
  }
};
