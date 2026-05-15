const Invoice = require('../models/Invoice');
const { AppError } = require('../middleware/errorHandler');

exports.getMyInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find({ client: req.user._id }).populate('project', 'title').sort({ createdAt: -1 });
    res.json({ success: true, data: invoices });
  } catch (error) { next(error); }
};

exports.getAllInvoices = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    const invoices = await Invoice.find(query).populate('client', 'firstName lastName email').populate('project', 'title').sort({ createdAt: -1 });
    res.json({ success: true, data: invoices });
  } catch (error) { next(error); }
};

exports.getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('client', 'firstName lastName email company').populate('project', 'title');
    if (!invoice) return next(new AppError('Invoice not found', 404));
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin' && invoice.client._id.toString() !== req.user._id.toString()) {
      return next(new AppError('Not authorized', 403));
    }
    res.json({ success: true, data: invoice });
  } catch (error) { next(error); }
};

exports.createInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json({ success: true, data: invoice });
  } catch (error) { next(error); }
};

exports.updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!invoice) return next(new AppError('Invoice not found', 404));
    res.json({ success: true, data: invoice });
  } catch (error) { next(error); }
};

exports.deleteInvoice = async (req, res, next) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Invoice deleted' });
  } catch (error) { next(error); }
};
