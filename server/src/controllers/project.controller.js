const Project = require('../models/Project');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get public projects (portfolio)
// @route   GET /api/projects/public
exports.getPublicProjects = async (req, res, next) => {
  try {
    const query = { isPublic: true, status: 'completed' };
    if (req.query.featured === 'true') query.isFeatured = true;
    const projects = await Project.find(query)
      .populate('service', 'title slug')
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) || 20);
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's projects
// @route   GET /api/projects/my
exports.getMyProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ client: req.user._id })
      .populate('service', 'title')
      .sort({ updatedAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'firstName lastName email company')
      .populate('service', 'title slug');
    if (!project) return next(new AppError('Project not found', 404));

    // Check access
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      if (project.client?._id.toString() !== req.user._id.toString()) {
        return next(new AppError('Not authorized', 403));
      }
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all projects (admin)
// @route   GET /api/projects
exports.getAllProjects = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.priority) query.priority = req.query.priority;
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { clientName: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const [projects, total] = await Promise.all([
      Project.find(query)
        .populate('client', 'firstName lastName email')
        .populate('service', 'title')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      Project.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: projects,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create project (admin)
// @route   POST /api/projects
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project (admin)
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return next(new AppError('Project not found', 404));
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project (admin)
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return next(new AppError('Project not found', 404));
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};
