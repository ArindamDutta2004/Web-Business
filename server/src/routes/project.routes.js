const router = require('express').Router();
const c = require('../controllers/project.controller');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', c.getPublicProjects);
router.get('/my', protect, c.getMyProjects);
router.get('/:id', protect, c.getProject);
router.get('/', protect, adminOnly, c.getAllProjects);
router.post('/', protect, adminOnly, c.createProject);
router.put('/:id', protect, adminOnly, c.updateProject);
router.delete('/:id', protect, adminOnly, c.deleteProject);

module.exports = router;
