const router = require('express').Router();
const c = require('../controllers/lead.controller');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', c.createLead);
router.get('/', protect, adminOnly, c.getLeads);
router.get('/:id', protect, adminOnly, c.getLead);
router.put('/:id', protect, adminOnly, c.updateLead);
router.delete('/:id', protect, adminOnly, c.deleteLead);

module.exports = router;
