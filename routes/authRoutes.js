const { Router } = require('express')
const router = Router();
const authController = require('../controllers/authController')

router.post('/signup', authController.post_signup);
router.post('/signin', authController.post_signin);
router.get('/getusers', authController.get_users);

module.exports = router;