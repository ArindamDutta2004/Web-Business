const router = require('express').Router();
const c = require('../controllers/blog.controller');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', c.getBlogs);
router.get('/admin/all', protect, adminOnly, c.getAllBlogsAdmin);
router.get('/:slug', c.getBlogBySlug);
router.post('/', protect, adminOnly, c.createBlog);
router.put('/:id', protect, adminOnly, c.updateBlog);
router.delete('/:id', protect, adminOnly, c.deleteBlog);

module.exports = router;
