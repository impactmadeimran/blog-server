const mongoose = require('mongoose');
const {Schema} = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        required:[true, 'Title is required'],
    },
    content: {
        type: String,
        required:[true, 'Content is required'],
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

const Posts = mongoose.model('Posts', PostSchema);
module.exports = Posts;
