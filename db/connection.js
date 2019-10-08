const mongoose = require('mongoose');


let mongoURI = "";
if (process.env.NODE_ENV === "production") {
    mongoURI = process.env.DB_URL;
  } else {
    mongoURI = "mongodb://localhost/songity";
  }
mongoose.connect('mongodb://localhost/songity');

mongoose.Promise = Promise;

module.exports = mongoose;