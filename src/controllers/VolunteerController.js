const Volunteer = require('../models/Volunteer');

const VolunteerController = {
  async index(req, res) {
    const volunteers = await Volunteer.findAll();
    res.render('pages/volunteers/index', { title: 'Voluntários', volunteers });
  },

  newForm(req, res) {
    res.render('pages/volunteers/form', { title: 'Novo Voluntário', volunteer: null, action: '/volunteers', method: 'POST' });
  },

  async create(req, res) {
    try {
      await Volunteer.create(req.body);
      req.flash('success', 'Voluntário cadastrado com sucesso!');
      res.redirect('/volunteers');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Erro ao cadastrar voluntário.');
      res.redirect('/volunteers/new');
    }
  },

  async editForm(req, res) {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.redirect('/volunteers');
    res.render('pages/volunteers/form', {
      title: 'Editar Voluntário',
      volunteer,
      action: `/volunteers/${volunteer.id}?_method=PUT`,
      method: 'POST'
    });
  },

  async update(req, res) {
    try {
      await Volunteer.update(req.params.id, req.body);
      req.flash('success', 'Voluntário atualizado com sucesso!');
      res.redirect('/volunteers');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Erro ao atualizar voluntário.');
      res.redirect(`/volunteers/${req.params.id}/edit`);
    }
  },

  async delete(req, res) {
    await Volunteer.delete(req.params.id);
    req.flash('success', 'Voluntário removido.');
    res.redirect('/volunteers');
  }
};

module.exports = VolunteerController;
