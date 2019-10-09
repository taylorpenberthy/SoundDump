const mongoose = require('../db/connection');
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  spotify: {
    id: String,
    access_token: String,
    email: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
