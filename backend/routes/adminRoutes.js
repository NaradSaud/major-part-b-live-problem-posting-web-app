const express = require('express');
const router = express.Router();
const { getUsers, updateUser, deleteUser } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.use(protect);
router.use(admin);

router.route('/users')
  .get(getUsers);

router.route('/users/:id')
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;