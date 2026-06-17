const Volunteer = require('../models/Volunteer');

module.exports = {
  async index(req, res) {
    try {
      res.json(await Volunteer.findAll());
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar voluntários.' });
    }
  },

  async show(req, res) {
    try {
      const v = await Volunteer.findById(req.params.id);
      if (!v) return res.status(404).json({ error: 'Não encontrado.' });
      res.json(v);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar voluntário.' });
    }
  },

  async create(req, res) {
    try {
      const id = await Volunteer.create(req.body);
      res.status(201).json(await Volunteer.findById(id));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao cadastrar voluntário.' });
    }
  },

  async update(req, res) {
    try {
      await Volunteer.update(req.params.id, req.body);
      res.json(await Volunteer.findById(req.params.id));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar voluntário.' });
    }
  },

  async destroy(req, res) {
    try {
      await Volunteer.delete(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover voluntário.' });
    }
  }
};
