const router = require('express').Router();
const { getServices, getServiceBySlug, getAllServicesAdmin, createService, updateService, deleteService } = require('../controllers/service.controller');
const { protect, adminOnly } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { serviceSchema } = require('../validators/schemas');

router.get('/', getServices);
router.get('/admin/all', protect, adminOnly, getAllServicesAdmin);
router.get('/:slug', getServiceBySlug);
router.post('/', protect, adminOnly, validate(serviceSchema), createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;
