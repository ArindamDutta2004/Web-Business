const router = require('express').Router();
const c = require('../controllers/contact.controller');
const { protect, adminOnly } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { contactSchema } = require('../validators/schemas');

router.post('/', validate(contactSchema), c.submitContact);
router.get('/', protect, adminOnly, c.getContacts);
router.get('/:id', protect, adminOnly, c.getContact);
router.put('/:id/reply', protect, adminOnly, c.replyContact);
router.delete('/:id', protect, adminOnly, c.deleteContact);

module.exports = router;
