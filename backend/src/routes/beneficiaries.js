const router = require('express').Router();
const multer = require('multer');
const path   = require('path');
const fs     = require('fs');
const ctrl   = require('../controllers/BeneficiaryController');

const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'animals');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `animal-${req.params.id}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Apenas imagens são permitidas (JPEG, PNG, GIF, WEBP).'));
  }
});

router.get('/',    ctrl.index);
router.post('/',   ctrl.create);
router.get('/:id', ctrl.show);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);
router.post('/:id/photo',
  (req, res, next) => upload.single('photo')(req, res, err => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  }),
  ctrl.uploadPhoto
);

module.exports = router;
