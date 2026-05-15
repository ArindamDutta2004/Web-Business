const Service = require('../models/Service');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get all services (public)
// @route   GET /api/services
exports.getServices = async (req, res, next) => {
  try {
    const query = { isActive: true };
    if (req.query.featured === 'true') query.isFeatured = true;
    const services = await Service.find(query).sort({ order: 1 });
    res.json({ success: true, data: services, count: services.length });
  } catch (error) {
    next(error);
  }
};

// @desc    Get service by slug (public)
// @route   GET /api/services/:slug
exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) return next(new AppError('Service not found', 404));
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all services (admin - includes inactive)
// @route   GET /api/services/admin/all
exports.getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json({ success: true, data: services, count: services.length });
  } catch (error) {
    next(error);
  }
};

// @desc    Create service (admin)
// @route   POST /api/services
exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service (admin)
// @route   PUT /api/services/:id
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return next(new AppError('Service not found', 404));
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service (admin)
// @route   DELETE /api/services/:id
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return next(new AppError('Service not found', 404));
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};
