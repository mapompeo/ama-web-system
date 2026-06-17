const router = require('express').Router();
const ctrl   = require('../controllers/DashboardController');

router.get('/stats', ctrl.stats);

module.exports = router;
