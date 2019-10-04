const mongoose = require('./connection');

const Post = require('../models/Post');
const User = require('../models/User');
// const seedData = require('./posts.json');

User.deleteMany({}).then(() => {
    console.log('deleted all users');
    Post.deleteMany({}).then(() => console.log('deleted all posts'))


    User.create({
        name:"Big Tayla",
        username: "taylor",
        email: "taylor@gmail.com"
    }).then(taylor => {
        Post.create({
            title: "Juice",
            link: "https://open.spotify.com/embed/track/0k664IuFwVP557Gnx7RhIl",
            image: "",
            caption: "My fav song!!!",
            posted: taylor.id
        }).then(song => {
            taylor.posts.push(song);
            taylor.save();
            console.log('created taylor-juice');
        });
    });

    User.create({
        name: "big lis",
        username: "biglis123",
        email: "biglis@biglis.com"
    }).then(lis => {
        Post.create({
            title: "Trophies",
            link: "https://open.spotify.com/embed/track/4FseJ7iZy0wbgJZjtddLSJ",
            image: "",
            caption: "My fav song, a Trophies!!!",
            posted: lis.id
        }).then(song => {
            lis.posts.push(song);
            lis.save();
           console.log(lis.posts[0])
            console.log("created big lis");
        });
    })
       
    })
        
    .catch(err => console.log(err, 'hello in seedJS'))
    



