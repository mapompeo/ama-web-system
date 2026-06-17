const router = require('express').Router();
const ctrl   = require('../controllers/ActivityController');

router.get('/',    ctrl.index);
router.post('/',   ctrl.create);
router.get('/:id', ctrl.show);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);

module.exports = router;
