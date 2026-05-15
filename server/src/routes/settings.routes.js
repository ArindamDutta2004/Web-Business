const router = require('express').Router();
const c = require('../controllers/settings.controller');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', c.getPublicSettings);
router.get('/', protect, adminOnly, c.getAllSettings);
router.put('/', protect, adminOnly, c.updateSetting);
router.delete('/:id', protect, adminOnly, c.deleteSetting);

module.exports = router;
