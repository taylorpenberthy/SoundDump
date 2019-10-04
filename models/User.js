const mongoose = require('../db/connection');
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    name: String,
    posts: [
        {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
    // followers: [
    //     {
    //         ref: "User",
    //         type: mongoose.Schema.Types.ObjectId
    //     }
    // ],
    // following: [
    //     {
    //         ref: "User",
    //         type: mongoose.Schema.Types.ObjectId
    //     }
    // ]

});

const User = mongoose.model('User', UserSchema);

module.exports = User;