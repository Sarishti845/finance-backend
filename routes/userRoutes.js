const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  updateUserRole,
  toggleUserStatus
} = require('../controllers/userController');

const { verifyToken } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');


router.post('/', verifyToken, authorize('admin'), createUser);
router.get('/', verifyToken, authorize('admin'), getUsers);
router.put('/:id/role', verifyToken, authorize('admin'), updateUserRole);
router.put('/:id/status', verifyToken, authorize('admin'), toggleUserStatus);

module.exports = router;