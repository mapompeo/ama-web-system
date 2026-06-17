const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const DashboardController = require('../controllers/DashboardController');

router.get('/', (req, res) => res.redirect('/auth/login'));
router.get('/dashboard', auth, DashboardController.index);

module.exports = router;
