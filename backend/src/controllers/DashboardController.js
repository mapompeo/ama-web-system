const Animal   = require('../models/Animal');
const Activity = require('../models/Activity');

module.exports = {
  async stats(req, res) {
    try {
      const year = new Date().getFullYear();
      const uid  = req.user.id;
      const [
        animais, upcoming,
        recentActivities, monthlyChart, upcomingActivities, activityStatus,
        animalsBySpecies, animalsByAdoptionStatus
      ] = await Promise.all([
        Animal.count(uid),
        Activity.countUpcoming(uid),
        Activity.findRecent(5, uid),
        Activity.countByMonth(year, uid),
        Activity.findUpcoming(6, uid),
        Activity.countByStatus(uid),
        Animal.countBySpecies(uid),
        Animal.countByAdoptionStatus(uid)
      ]);

      res.json({
        stats: { animais, upcoming },
        recentActivities,
        monthlyChart,
        chartYear: year,
        upcomingActivities,
        activityStatus,
        animalsBySpecies,
        animalsByAdoptionStatus
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao carregar dashboard.' });
    }
  }
};
