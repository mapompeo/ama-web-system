const Activity = require('../models/Activity');

const ActivityController = {
  async index(req, res) {
    const activities = await Activity.findAll();
    res.render('pages/activities/index', { title: 'Atividades', activities });
  },

  newForm(req, res) {
    res.render('pages/activities/form', { title: 'Nova Atividade', activity: null, action: '/activities', method: 'POST' });
  },

  async create(req, res) {
    try {
      await Activity.create(req.body);
      req.flash('success', 'Atividade criada com sucesso!');
      res.redirect('/activities');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Erro ao criar atividade.');
      res.redirect('/activities/new');
    }
  },

  async editForm(req, res) {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.redirect('/activities');
    res.render('pages/activities/form', {
      title: 'Editar Atividade',
      activity,
      action: `/activities/${activity.id}?_method=PUT`,
      method: 'POST'
    });
  },

  async update(req, res) {
    try {
      await Activity.update(req.params.id, req.body);
      req.flash('success', 'Atividade atualizada com sucesso!');
      res.redirect('/activities');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Erro ao atualizar atividade.');
      res.redirect(`/activities/${req.params.id}/edit`);
    }
  },

  async delete(req, res) {
    await Activity.delete(req.params.id);
    req.flash('success', 'Atividade removida.');
    res.redirect('/activities');
  }
};

module.exports = ActivityController;
