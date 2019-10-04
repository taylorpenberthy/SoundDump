const express = require('express');
const router = express.Router();
const postsModel = require('../models/Post');
const User = require('../models/User');

router.delete('/:id', (req, res) => {
    postsModel.findOneAndDelete({_id: req.params.id}).then(() => {
        res.redirect('/');
    })
})


router.post('/new', (req, res) => {
    postsModel.create(req.body).then(posts => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
});

router.put('/edit/:id', (req, res) => {
    postsModel.findOneAndUpdate({_id: req.params.id}, req.body,)
    .then(post => {
        res.redirect('/')
    }) .catch(err => {
        console.log(err);
    })
})
router.get('/', (req, res) => {
    postsModel.find({}).populate('posted').then(posts => {
        res.render("index", {posts});
    })
})

router.get('/edit/:id', (req, res) => {
    postsModel.findOne({_id: req.params.id})
    .then(post => {
        res.render('edit', {post});
    })
})

router.get('/new', (req, res) => {
    res.render('new');
})

router.get('/:id', (req, res) => {
    postsModel.findOne({_id: req.params.id}).populate('posted').then(post => {
        res.render("show", {post})
    })
})




module.exports = router;