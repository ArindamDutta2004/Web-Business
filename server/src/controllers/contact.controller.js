const Contact = require('../models/Contact');
const { AppError } = require('../middleware/errorHandler');

exports.submitContact = async (req, res, next) => {
  try {
    req.body.ip = req.ip;
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Message sent successfully', data: contact });
  } catch (error) { next(error); }
};

exports.getContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const query = {};
    if (req.query.status) query.status = req.query.status;

    const [contacts, total] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Contact.countDocuments(query),
    ]);
    res.json({ success: true, data: contacts, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: 'read' }, { new: true });
    if (!contact) return next(new AppError('Contact not found', 404));
    res.json({ success: true, data: contact });
  } catch (error) { next(error); }
};

exports.replyContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, {
      reply: req.body.reply, status: 'replied', repliedAt: new Date(), repliedBy: req.user._id,
    }, { new: true });
    if (!contact) return next(new AppError('Contact not found', 404));
    res.json({ success: true, data: contact });
  } catch (error) { next(error); }
};

exports.deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) { next(error); }
};
