const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { createProblem, getProblems, updateStatus } = require('../controllers/problemController');

// Configure multer storage for uploaded images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb(new Error('Images only!'));
};
const upload = multer({ storage, fileFilter });

router.route('/')
  .get(getProblems)
  .post(protect, upload.single('photo'), createProblem);

router.route('/:id/status')
  .put(protect, admin, updateStatus);

module.exports = router;