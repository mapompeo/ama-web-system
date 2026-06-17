const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const VolunteerController = require('../controllers/VolunteerController');

router.get('/', auth, VolunteerController.index);
router.get('/new', auth, VolunteerController.newForm);
router.post('/', auth, VolunteerController.create);
router.get('/:id/edit', auth, VolunteerController.editForm);
router.put('/:id', auth, VolunteerController.update);
router.delete('/:id', auth, VolunteerController.delete);

module.exports = router;
