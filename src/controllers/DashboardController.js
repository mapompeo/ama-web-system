const Volunteer = require('../models/Volunteer');
const Beneficiary = require('../models/Beneficiary');
const Activity = require('../models/Activity');

const DashboardController = {
  async index(req, res) {
    try {
      const [volunteers, beneficiaries, upcoming, recentActivities] = await Promise.all([
        Volunteer.count(),
        Beneficiary.count(),
        Activity.countUpcoming(),
        Activity.findRecent(5)
      ]);

      res.render('pages/dashboard', {
        title: 'Dashboard',
        stats: { volunteers, beneficiaries, upcoming },
        recentActivities
      });
    } catch (err) {
      console.error(err);
      res.status(500).render('pages/error', { title: 'Erro', message: 'Erro ao carregar dashboard.' });
    }
  }
};

module.exports = DashboardController;
