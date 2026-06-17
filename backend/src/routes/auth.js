const router = require('express').Router();
const ctrl   = require('../controllers/AuthController');
const auth   = require('../middlewares/auth');

router.post('/login',  ctrl.login);
router.post('/logout', auth, ctrl.logout);
router.get('/me',      ctrl.me);

module.exports = router;
