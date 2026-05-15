const router = require('express').Router();
const c = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth');

router.get('/', protect, c.getMyNotifications);
router.put('/:id/read', protect, c.markAsRead);
router.put('/read-all', protect, c.markAllAsRead);
router.delete('/:id', protect, c.deleteNotification);

module.exports = router;
