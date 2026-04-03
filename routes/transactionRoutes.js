
const express = require('express');
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getStats
} = require('../controllers/transactionController');

const { verifyToken } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { getMonthlyTrends } = require('../controllers/transactionController');
// CREATE → Admin only
router.post('/', verifyToken, authorize('admin'), createTransaction);

// GET → Analyst + Admin
router.get('/', verifyToken, authorize('admin', 'analyst'), getTransactions);

// STATS → Analyst + Admin
router.get('/stats', verifyToken, authorize('admin', 'analyst'), getStats);

// UPDATE → Admin only
router.put('/:id', verifyToken, authorize('admin'), updateTransaction);

// DELETE → Admin only
router.delete('/:id', verifyToken, authorize('admin'), deleteTransaction);
router.get('/trends', verifyToken, authorize('admin', 'analyst'), getMonthlyTrends);
module.exports = router;