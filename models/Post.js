const mongoose = require('../db/connection');
const moment = require('moment')
const PostSchema = new mongoose.Schema({
    title: String,
    link: String,
    caption: String,
    poster: String,
    songId: String,
    like_count: Number,
    posted: 
        {
            type: mongoose.Schema.Types.String,
            ref: "User"
        },
    date: {type: String, default: moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;