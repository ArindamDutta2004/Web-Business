const router = require('express').Router();
const c = require('../controllers/invoice.controller');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/my', protect, c.getMyInvoices);
router.get('/', protect, adminOnly, c.getAllInvoices);
router.get('/:id', protect, c.getInvoice);
router.post('/', protect, adminOnly, c.createInvoice);
router.put('/:id', protect, adminOnly, c.updateInvoice);
router.delete('/:id', protect, adminOnly, c.deleteInvoice);

module.exports = router;
