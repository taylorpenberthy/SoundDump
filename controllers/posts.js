const express = require('express');
const router = express.Router();
const postsModel = require('../models/Post');
const User = require('../models/User');
const moment = require('moment');
var createDate = moment();
var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.DB_ID,
  clientSecret: process.env.DB_SECRET,
  redirectUri: 'http://localhost:5000/posts/new'
});


spotifyApi.clientCredentialsGrant().then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('the access token is ' + data.body['access_token']);

    spotifyApi.setAccessToken(data.body['access_token']);
},  function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  })

// (spotifyApi.setAccessToken(process.env.DB_TOKEN);


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


 router.get('/songs/search', (req, res) => {
    
    let song = req.query.song;
    if (song !== undefined){
        
        spotifyApi.searchTracks(song).then(
            function(data) {
                
                 res.render('search', {data});
             }
         )
        }
        else {
            res.render('search');
        }
     }
    )
    


    
module.exports = router;