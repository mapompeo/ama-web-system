const Animal = require('../models/Animal');
const Activity    = require('../models/Activity');

module.exports = {
  async stats(req, res) {
    try {
      const year = new Date().getFullYear();
      const [
        animais, upcoming,
        recentActivities, monthlyChart, upcomingActivities, activityStatus,
        animalsBySpecies, animalsByAdoptionStatus
      ] = await Promise.all([
        Animal.count(),
        Activity.countUpcoming(),
        Activity.findRecent(5),
        Activity.countByMonth(year),
        Activity.findUpcoming(6),
        Activity.countByStatus(),
        Animal.countBySpecies(),
        Animal.countByAdoptionStatus()
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
