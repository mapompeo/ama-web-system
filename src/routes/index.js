const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', (req, res) => res.redirect('/auth/login'));
router.get('/dashboard', auth, (req, res) => {
  res.sendFile('pages/dashboard.html', { root: 'views' });
});

module.exports = router;
