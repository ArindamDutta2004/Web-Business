const Blog = require('../models/Blog');
const { AppError } = require('../middleware/errorHandler');

exports.getBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const query = { status: 'published' };
    if (req.query.category) query.category = req.query.category;
    if (req.query.featured === 'true') query.isFeatured = true;

    const [blogs, total] = await Promise.all([
      Blog.find(query).populate('author', 'firstName lastName avatar').sort({ publishedAt: -1 }).skip(skip).limit(limit),
      Blog.countDocuments(query),
    ]);
    res.json({ success: true, data: blogs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'firstName lastName avatar');
    if (!blog) return next(new AppError('Blog post not found', 404));
    res.json({ success: true, data: blog });
  } catch (error) { next(error); }
};

exports.getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate('author', 'firstName lastName').sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) { next(error); }
};

exports.createBlog = async (req, res, next) => {
  try {
    req.body.author = req.user._id;
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) { next(error); }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return next(new AppError('Blog not found', 404));
    res.json({ success: true, data: blog });
  } catch (error) { next(error); }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return next(new AppError('Blog not found', 404));
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) { next(error); }
};
