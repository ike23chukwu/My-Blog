const express = require('express')
const router = express.Router()
const blogs = require('../controllers/blogsController')
const requireAuth = require('../middlewares/requireAuth')

router.get('/', blogs.getAllBlogs)
router.get('/:blog_id', blogs.getBlog)
router.use(requireAuth)
router.post('/create', blogs.addBlog)
router.post('/:blog_id', blogs.postComment)

module.exports = router