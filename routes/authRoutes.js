const { Router } = require('express')
const router = Router();
const authController = require('../controllers/authController')
const multer = require('multer')
const path = require('path')
const User = require('../models/User');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
        // console.log(file)
    }
})

const upload = multer({ storage: storage })

router.post('/signup', authController.post_signup);
router.post('/signin', authController.post_signin);
router.get('/getusers', authController.get_users);
router.post('/update_users', upload.single("image"), async (req, res) => {
    const { id, username, fullname, image, email } = req.body;
    if (!req.file) {
        res.send(400).json({ message: "Please upload a file" })
    }
    else {
        const imageUrl = req.file.path;
        console.log(imageUrl)
        // console.log(req.file)
        try {
            const user = await User.findByIdAndUpdate(id, {
                 email,
                fullname,
                username,
                image: imageUrl
            });
            res.json({user,  "success": true })
        }
        catch (err) {
            res.json({ message: err })
        }
    }
});

module.exports = router;