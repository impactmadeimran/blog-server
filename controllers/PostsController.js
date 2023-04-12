const supabase = require('../constants/supabase');

module.exports.get_posts = async (req, res) => {
    try {
        const { data: posts, error } = await supabase.from('posts').select();
        if (!error) {
            return res.status(201).json({ posts, "success": true });
        }
    }
    catch {
        res.status(400).json({ "message": "Posts not found", "success": false, "error": err });
    }

}

module.exports.remove_posts = async (req, res) => {
    const { id } = req.body;
    try {
        const { error } = await supabase.from('posts').delete().eq('id', id)
        if (!error) {
            return res.status(201).json({ "message": "Post removed successfully", "success": true });
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ "message": "Can't delete Post", "success": false, "error": err });
    }
}
module.exports.get_post = async (req, res) => {
    const { id } = req.body;
    try {
        const { data: post, error } = await supabase.from('posts').select().eq('id', id)
        console.log(...post)
        if (!error) {
            return res.status(200).json(...post);
        }
    }
    catch (err) {
        res.status(400).json({ "message": "Post not found", "success": false, "error": err });
    }
}
module.exports.user_posts = async (req, res) => {
    const { author } = req.body
    try {
        // const posts = await Posts.find({ author: author });
        const { data, error } = await supabase.from('posts').select().eq('author', author)
        if (!error) {
            return res.status(201).json({ data, "success": true })
        }
    }
    catch (err) {
        return res.status(400).json({ "success": false, err })
    }
}

module.exports.create_post = async (req, res) => {
    const { title, author, image, content, topic } = req.body;

    try {
        const { error } = await supabase.from('posts').insert({ title, author, image, content, topic });
        console.log(error)
        if (!error) {

            return res.status(200).json({ "info": "Post created", "success": true })
        }

    } catch (err) {
        return res.status(400).json({ "success": false, err })
    }
}

module.exports.update_post = async (req, res) => {
    const { id } = req.body;

    const { title, author, image, content, topic } = req.body;
    try {
        const { error } = await supabase.from('posts').update({ author, image, content, topic, title }).eq("id", id);
        if (!error) {
            return res.status(200).json({ "info": "Post updated successfully", "success": true })
        }
    } catch (err) {
        return res.status(400).json({ "info": "Post updated successfully", "success": false })

    }
}