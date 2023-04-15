const { Router } = require('express');
const { get_posts, remove_posts, get_post, user_posts, create_post, update_post } = require('../controllers/PostsController');
const router = Router();
const verifyToken = require('../middleware/auth');


router.get('/fetch_posts', verifyToken, get_posts);
router.post('/remove_post', verifyToken, remove_posts);
router.post('/fetch_post', verifyToken, get_post);
router.post('/user_posts', verifyToken, user_posts)
router.post('/create_post', verifyToken, create_post);
router.post('/update_post', verifyToken, update_post)


module.exports = router;    