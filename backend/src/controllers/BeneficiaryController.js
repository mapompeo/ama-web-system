const Beneficiary = require('../models/Beneficiary');

module.exports = {
  async index(req, res) {
    try {
      res.json(await Beneficiary.findAll());
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
      const id = await Beneficiary.create(req.body);
      res.status(201).json(await Beneficiary.findById(id));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao cadastrar animal.' });
    }
  },

  async update(req, res) {
    try {
      await Beneficiary.update(req.params.id, req.body);
      res.json(await Beneficiary.findById(req.params.id));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar animal.' });
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
