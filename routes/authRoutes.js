const { Router } = require('express')
const router = Router();
const authController = require('../controllers/authController')
// const multer = require('multer')
// const path = require('path')
// const User = require('../models/User');
const verifyToken = require('../middleware/auth');



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./Images");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//         // console.log(file)
//     }
// })

// const upload = multer({ storage: storage })

router.post('/signup', authController.post_signup);
router.post('/signin', authController.post_signin);
router.get('/getusers', verifyToken, authController.get_users);
// router.post('/update_users', upload.single("image"), async (req, res) => {
//     const { id, username, fullname, email } = req.body;
//     if (!req.file) {
//         return res.send(400).json({ message: "Please upload a file" })
//     }
//     else {
//         const imageUrl = req.file.path;
//         try {
//             const user = await User.findByIdAndUpdate(id, {
//                 email,
//                 fullname,
//                 username,
//                 image: imageUrl
//             });
//             return res.status(201).json({ user, "success": true })
//         }
//         catch (err) {
//             return res.status(400).json({ message: err })
//         }
//     }
// });

module.exports = router;