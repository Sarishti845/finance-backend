const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Admin only route
router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: "Welcome Admin 🔥" });
});

// Analyst + Admin
router.get('/analytics', verifyToken, authorizeRoles('admin', 'analyst'), (req, res) => {
  res.json({ message: "Analytics Data 📊" });
});

// All logged users
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: "Dashboard Data 📈" });
});

module.exports = router;