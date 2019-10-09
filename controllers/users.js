const express = require('express');
const router = express.Router();
const postsModel = require('../models/Post');
const User = require('../models/User');

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate('posted')
    .then(profile => {
      res.render('showUser', { profile });
    });
});
router.get('/profile', (req, res) => {
  User.find({})
    .populate('posts')
    .then(profile => {
      res.render('showUser', { profile });
    });
});

module.exports = router;
