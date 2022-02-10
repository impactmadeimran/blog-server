const { Router } = require('express');
const { get_posts, add_posts, remove_posts, get_post, update_post } = require('../controllers/PostsController');
const router = Router();

router.get('/fetch_posts', get_posts);
router.post('/add_posts', add_posts);
router.post('/remove_post', remove_posts);
router.get('/fetch_post', get_post);
router.post('/update_post', update_post);

module.exports = router;    