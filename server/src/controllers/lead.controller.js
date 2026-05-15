const Lead = require('../models/Lead');
const { AppError } = require('../middleware/errorHandler');

exports.createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) { next(error); }
};

exports.getLeads = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.priority) query.priority = req.query.priority;
    const leads = await Lead.find(query).populate('assignedTo', 'firstName lastName').sort({ createdAt: -1 });
    res.json({ success: true, data: leads });
  } catch (error) { next(error); }
};

exports.getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'firstName lastName');
    if (!lead) return next(new AppError('Lead not found', 404));
    res.json({ success: true, data: lead });
  } catch (error) { next(error); }
};

exports.updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) return next(new AppError('Lead not found', 404));
    res.json({ success: true, data: lead });
  } catch (error) { next(error); }
};

exports.deleteLead = async (req, res, next) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) { next(error); }
};
