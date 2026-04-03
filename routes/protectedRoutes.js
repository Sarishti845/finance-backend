const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');


router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: "Welcome Admin 🔥" });
});


router.get('/analytics', verifyToken, authorizeRoles('admin', 'analyst'), (req, res) => {
  res.json({ message: "Analytics Data 📊" });
});


router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: "Dashboard Data 📈" });
});

module.exports = router;