const Contact = require('../models/Contact');
const { AppError } = require('../middleware/errorHandler');
const { sendContactNotification } = require('../utils/emailService');
const { sendWhatsAppContactNotification } = require('../utils/whatsappService');

// @desc    Submit contact form (public — "Let's Talk")
// @route   POST /api/contact
exports.submitContact = async (req, res, next) => {
  try {
    req.body.ip = req.ip;
    const contact = await Contact.create(req.body);

    // Fire-and-forget: send email + WhatsApp notifications
    // We don't await these so the user gets an instant response
    sendContactNotification(contact)
      .then((result) => {
        if (!result.success) console.warn('[CONTACT] Email notification failed:', result.error);
      })
      .catch((err) => console.error('[CONTACT] Email notification error:', err.message));

    sendWhatsAppContactNotification(contact)
      .then((result) => {
        if (!result.success) console.warn('[CONTACT] WhatsApp notification failed:', result.error);
      })
      .catch((err) => console.error('[CONTACT] WhatsApp notification error:', err.message));

    res.status(201).json({ success: true, message: 'Message sent successfully', data: contact });
  } catch (error) { next(error); }
};

// @desc    Get all contacts (admin)
// @route   GET /api/contact
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

// @desc    Get single contact (admin) — marks as read
// @route   GET /api/contact/:id
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: 'read' }, { new: true });
    if (!contact) return next(new AppError('Contact not found', 404));
    res.json({ success: true, data: contact });
  } catch (error) { next(error); }
};

// @desc    Reply to contact (admin)
// @route   PUT /api/contact/:id/reply
exports.replyContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, {
      reply: req.body.reply, status: 'replied', repliedAt: new Date(), repliedBy: req.user._id,
    }, { new: true });
    if (!contact) return next(new AppError('Contact not found', 404));
    res.json({ success: true, data: contact });
  } catch (error) { next(error); }
};

// @desc    Delete contact (admin)
// @route   DELETE /api/contact/:id
exports.deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) { next(error); }
};
