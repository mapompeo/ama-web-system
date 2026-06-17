const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const BeneficiaryController = require('../controllers/BeneficiaryController');

router.get('/', auth, BeneficiaryController.index);
router.get('/new', auth, BeneficiaryController.newForm);
router.post('/', auth, BeneficiaryController.create);
router.get('/:id/edit', auth, BeneficiaryController.editForm);
router.put('/:id', auth, BeneficiaryController.update);
router.delete('/:id', auth, BeneficiaryController.delete);

module.exports = router;
