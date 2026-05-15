const router = require('express').Router();
const { getDashboardStats } = require('../controllers/admin.controller');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/dashboard', protect, adminOnly, getDashboardStats);

module.exports = router;
