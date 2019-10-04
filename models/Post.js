const mongoose = require('../db/connection');
const PostSchema = new mongoose.Schema({
    title: String,
    link: String,
    caption: String,
    poster: String,
    posted: 
        {
            type: mongoose.Schema.Types.String,
            ref: "User"
        }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;