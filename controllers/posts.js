const express = require('express');
const router = express.Router();
const postsModel = require('../models/Post');
const User = require('../models/User');

// router.get('/', (req, res) => {
//     postsModel.find({}).then(posts => 
//         res.json(posts))
// });

router.get('/', (req, res) => {
    postsModel.find({}).populate('posted').then(posts => {
        

        res.render("index", {posts});
    })
})

router.get('/:id', (req, res) => {
    postsModel.findOne({_id: req.params.id}).populate('posted').then(post => {
        res.render("show", {post})
    })
})




module.exports = router;