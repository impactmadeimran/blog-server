const {Router} = require('express');
const { get_posts, add_posts,remove_posts } = require('../controllers/PostsController');
const router = Router();

router.get('/fetch_posts',get_posts);
router.post('/add_posts',add_posts)
router.post('/remove_post',remove_posts)

module.exports = router;    