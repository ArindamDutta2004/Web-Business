const Notification = require('../models/Notification');
const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');

exports.getAllNotificationsAdmin = async (req, res, next) => {
  try {
    const notifications = await Notification.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) || 100);
    res.json({ success: true, data: notifications });
  } catch (error) { next(error); }
};

exports.getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
    const unreadCount = await Notification.countDocuments({ user: req.user._id, isRead: false });
    res.json({ success: true, data: notifications, unreadCount });
  } catch (error) { next(error); }
};

exports.sendNotificationAdmin = async (req, res, next) => {
  try {
    const { audience = 'all', userId, title, message, type = 'info', link, metadata } = req.body;

    if (!title || !message) {
      return next(new AppError('Title and message are required', 400));
    }

    let users = [];
    if (audience === 'single') {
      if (!userId) return next(new AppError('User is required for single-recipient notifications', 400));
      const user = await User.findById(userId);
      if (!user) return next(new AppError('User not found', 404));
      users = [user];
    } else if (audience === 'admins') {
      users = await User.find({ role: { $in: ['admin', 'superadmin'] }, isActive: true });
    } else {
      users = await User.find({ isActive: true });
    }

    const notifications = await Notification.insertMany(
      users.map((user) => ({
        user: user._id,
        title,
        message,
        type,
        link,
        metadata,
      }))
    );

    res.status(201).json({ success: true, data: notifications, count: notifications.length });
  } catch (error) { next(error); }
};

exports.markAsRead = async (req, res, next) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true, readAt: new Date() });
    res.json({ success: true, message: 'Marked as read' });
  } catch (error) { next(error); }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true, readAt: new Date() });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) { next(error); }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) { next(error); }
};

exports.createNotification = async (userId, data) => {
  try {
    return await Notification.create({ user: userId, ...data });
  } catch (error) { console.error('Notification creation failed:', error); }
};
