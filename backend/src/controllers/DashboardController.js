const Volunteer = require('../models/Volunteer');
const Beneficiary = require('../models/Beneficiary');
const Activity = require('../models/Activity');

const DashboardController = {
  async index(req, res) {
    try {
      const year = new Date().getFullYear();
      const [volunteers, beneficiaries, upcoming, recentActivities, monthlyChart] = await Promise.all([
        Volunteer.count(),
        Beneficiary.count(),
        Activity.countUpcoming(),
        Activity.findRecent(5),
        Activity.countByMonth(year)
      ]);

      res.render('pages/dashboard', {
        title: 'Dashboard',
        stats: { volunteers, beneficiaries, upcoming },
        recentActivities,
        monthlyChart,
        chartYear: year
      });
    } catch (err) {
      console.error(err);
      res.status(500).render('pages/error', { title: 'Erro', code: 500, message: 'Erro ao carregar dashboard.' });
    }
  }
};

module.exports = DashboardController;
