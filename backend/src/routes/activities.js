const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ActivityController = require('../controllers/ActivityController');

router.get('/', auth, ActivityController.index);
router.get('/new', auth, ActivityController.newForm);
router.post('/', auth, ActivityController.create);
router.get('/:id/edit', auth, ActivityController.editForm);
router.put('/:id', auth, ActivityController.update);
router.delete('/:id', auth, ActivityController.delete);

module.exports = router;
