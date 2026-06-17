const Volunteer   = require('../models/Volunteer');
const Beneficiary = require('../models/Beneficiary');
const Activity    = require('../models/Activity');

module.exports = {
  async stats(req, res) {
    try {
      const year = new Date().getFullYear();
      const [volunteers, beneficiaries, upcoming, recentActivities, monthlyChart, upcomingActivities, activityStatus] = await Promise.all([
        Volunteer.count(),
        Beneficiary.count(),
        Activity.countUpcoming(),
        Activity.findRecent(5),
        Activity.countByMonth(year),
        Activity.findUpcoming(6),
        Activity.countByStatus()
      ]);
      res.json({ stats: { volunteers, beneficiaries, upcoming }, recentActivities, monthlyChart, chartYear: year, upcomingActivities, activityStatus });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao carregar dashboard.' });
    }
  }
};
