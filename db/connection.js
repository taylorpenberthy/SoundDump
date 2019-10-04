const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/songity');

mongoose.Promise = Promise;

module.exports = mongoose;