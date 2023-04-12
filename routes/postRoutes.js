const { Router } = require('express');
const multer = require('multer');
const { get_posts, remove_posts, get_post, user_posts, create_post, update_post } = require('../controllers/PostsController');
const Posts = require('../models/Posts');
const router = Router();
const path = require('path');

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

router.get('/fetch_posts', get_posts);
router.post('/remove_post', remove_posts);
router.post('/fetch_post', get_post);
router.post('/user_posts', user_posts)
router.post('/create_post', create_post);
router.post('/update_post', update_post)
// router.post('/add_post', upload.single("image"), async (req, res) => {
//     const { title, content, author, topic } = req.body;

//     if (!req.file) {
//         res.send(400).json({ message: "Please upload a file" })
//     } else {
//         const imageUrl = req.file.path;

//         try {
//             const post = await Posts.create({ title, content, author, image: imageUrl, topic });
//             return res.status(201).json({ post, "message": "Post created successfully", "success": true });
//         }
//         catch (err) {
//             console.log(err)
//             res.status(400).json({ "message": "Can't create Post", "success": false, "error": err });
//         }
//     }
// });
// router.post('/update_post', upload.single('image'), async (req, res) => {
//     const { id, title, content, author, topic } = req.body;
//     if (!req.file) {
//         return res.status(400).json({ message: "Please upload a file" })
//     }
//     else {
//         const imageUrl = req.file.path;
//         try {
//             const updatePost = await Posts.findByIdAndUpdate(id, { title, content, image: imageUrl, author, topic });
//             return res.status(201).json({ updatePost, "message": "Post updated successfully", "success": true });
//         } catch (err) {
//             console.log(err)
//             res.status(500).json({ "message": "Can't update Post", "success": false, "error": err });
//         }
//     }

// });

module.exports = router;    