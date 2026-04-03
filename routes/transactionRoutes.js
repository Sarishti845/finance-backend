
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

router.post('/', verifyToken, authorize('admin'), createTransaction);

router.get('/', verifyToken, authorize('admin', 'analyst'), getTransactions);


router.get('/stats', verifyToken, authorize('admin', 'analyst'), getStats);


router.put('/:id', verifyToken, authorize('admin'), updateTransaction);


router.delete('/:id', verifyToken, authorize('admin'), deleteTransaction);
router.get('/trends', verifyToken, authorize('admin', 'analyst'), getMonthlyTrends);
module.exports = router;