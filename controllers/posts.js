const express = require('express');
const router = express.Router();
const postsModel = require('../models/Post');
const User = require('../models/User');
const moment = require('moment');
var createDate = moment();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: 'ad1c012acdaf423399f7c953f0bfe0f4',
  clientSecret: '3aead2ebaf2b45acbd3c66632450f697',
  redirectUri: 'local'
});

spotifyApi.setAccessToken(' BQCGd8xH5KgQnkkOTm_9TmJQSLmm0HznPxT7PQzcvYsYAzsAbzfwLqTCgMZePlkLNlryiT5kTJkJYSuGKZ0');


router.delete('/:id', (req, res) => {
    postsModel.findOneAndDelete({_id: req.params.id}).then(() => {
        res.redirect('/posts');
    })
})

router.post('/posts', (req, res) => {
    req.body.created_at = createDate.format("dddd, MMMM Do YYYY, h:mm:ss a");
    postsModel.create(req.body)
    .then(newItem => {
        res.redirect('/posts');
    }).catch(err => {
        console.log(err);
    }
    )
});


router.post('/new', (req, res) => {
    postsModel.create(req.body).then(posts => {
        res.redirect('/posts');
    }).catch(err => {
        console.log(err);
    })
});


router.put('/edit/:id', (req, res) => {
    postsModel.findOneAndUpdate({_id: req.params.id}, req.body,)
    .then(post => {
        res.redirect('/posts')
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



// router.get('/songs/search', (req, res) => {
// // res.render('search')

//     song = req.query.song;
//     if (song !== null){
//      spotifyApi.searchTracks(song).then(
//          function(data) {
             
//              res.render('search', {data});
//          }
//      )
//     }
//     else {
//         res.render('search');
//     }
// }
// )

 

 router.get('/songs/search', (req, res) => {
    // res.render('search')
res.render('search');
    song = req.query.song;
    
    if (song !== null){
        spotifyApi.searchTracks(song).then(
            function(data) {
                 res.render('search', {data});
             }
         )
        }
        // else {
        //     res.render('search');
        // }
     }
    )
    


    
module.exports = router;