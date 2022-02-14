const { Router } = require('express')
const router = Router();
const authController = require('../controllers/authController')

router.post('/signup', authController.post_signup);
router.post('/signin', authController.post_signin);
router.get('/getusers', authController.get_users);
router.post('/update_users', authController.update_users);

module.exports = router;