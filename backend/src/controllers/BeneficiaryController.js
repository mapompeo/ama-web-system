const Beneficiary = require('../models/Beneficiary');

const BeneficiaryController = {
  async index(req, res) {
    const beneficiaries = await Beneficiary.findAll();
    res.render('pages/beneficiaries/index', { title: 'Atendidos', beneficiaries });
  },

  newForm(req, res) {
    res.render('pages/beneficiaries/form', { title: 'Novo Atendido', beneficiary: null, action: '/beneficiaries', method: 'POST' });
  },

  async create(req, res) {
    try {
      await Beneficiary.create(req.body);
      req.flash('success', 'Atendido cadastrado com sucesso!');
      res.redirect('/beneficiaries');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Erro ao cadastrar atendido.');
      res.redirect('/beneficiaries/new');
    }
  },

  async editForm(req, res) {
    const beneficiary = await Beneficiary.findById(req.params.id);
    if (!beneficiary) return res.redirect('/beneficiaries');
    res.render('pages/beneficiaries/form', {
      title: 'Editar Atendido',
      beneficiary,
      action: `/beneficiaries/${beneficiary.id}?_method=PUT`,
      method: 'POST'
    });
  },

  async update(req, res) {
    try {
      await Beneficiary.update(req.params.id, req.body);
      req.flash('success', 'Atendido atualizado com sucesso!');
      res.redirect('/beneficiaries');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Erro ao atualizar atendido.');
      res.redirect(`/beneficiaries/${req.params.id}/edit`);
    }
  },

  async delete(req, res) {
    await Beneficiary.delete(req.params.id);
    req.flash('success', 'Atendido removido.');
    res.redirect('/beneficiaries');
  }
};

module.exports = BeneficiaryController;
