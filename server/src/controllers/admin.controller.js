const User = require('../models/User');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const Lead = require('../models/Lead');
const Invoice = require('../models/Invoice');
const Blog = require('../models/Blog');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [users, projects, contacts, leads, invoices, blogs] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Lead.countDocuments(),
      Invoice.find({ status: 'paid' }),
      Blog.countDocuments({ status: 'published' }),
    ]);

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const projectsByStatus = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5).populate('client', 'firstName lastName');
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        counts: { users, projects, newContacts: contacts, leads, publishedBlogs: blogs },
        totalRevenue,
        projectsByStatus,
        leadsByStatus,
        recentProjects,
        recentContacts,
      },
    });
  } catch (error) { next(error); }
};
