const Posts = require('../models/Posts');

module.exports.get_posts = async (req, res) => {
    try {
        const Post = await Posts.find({});
        return res.status(201).json({ Post, "message": "Posts fetched successfully", "success": true });
    }
    catch {
        res.status(400).json({ "message": "Posts not found", "success": false, "error": err });
    }

}

module.exports.add_posts = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const post = await Posts.create({ title, content, author });
        return res.status(201).json({ post, "message": "Post created successfully", "success": true });
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ "message": "Can't create Post", "success": false, "error": err });
    }
}

module.exports.remove_posts = async (req, res) => {
    const { id } = req.body;
    try {
        const post = await Posts.deleteOne({ _id: id });
        return res.status(201).json({ post, "message": "Post removed successfully", "success": true });
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ "message": "Can't delete Post", "success": false, "error": err });
    }
}
module.exports.get_post = async (req, res) => {
    const { id } = req.body;
    try {
        const post = await Posts.findById(id);
        if (post._id == id) {
            return res.status(201).json({ post, "message": "Post fetched successfully", "success": true });
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ "message": "Post not found", "success": false, "error": err });
    }
}
module.exports.update_post = async (req, res) => {
    const { id, title, content } = req.body;
    try {
        const updatePost = await Posts.findByIdAndUpdate(id, { title, content });
        return res.status(201).json({ updatePost, "message": "Post updated successfully", "success": true });
    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": "Can't update Post", "success": false, "error": err });
    }

}

// Another delete post function 

// module.exports.delete_post = async (req,res) => {
//     const {id} = res.id;
//     try{
//     const deletePost = await Posts.findByIdAndDelete(id);
//     return res.status(201).json({deletePost,"success":true,"message":"post deleted"})
//     }
//     catch(err){
//         console.log(err)
//     }
// }