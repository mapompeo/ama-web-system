const router = require('express').Router();
const ctrl   = require('../controllers/BeneficiaryController');
const contractCtrl = require('../controllers/AdoptionContractController');

router.get('/',    ctrl.index);
router.post('/',   ctrl.create);
router.get('/:id', ctrl.show);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);

router.get('/:id/contract',               contractCtrl.show);
router.post('/:id/contract',               contractCtrl.upload);
router.delete('/:id/contract/:contractId', contractCtrl.destroy);

module.exports = router;
