const mongoose = require('./connection');

const Post = require('../models/Post');
const User = require('../models/User');
// const seedData = require('./posts.json');

User.deleteMany({}).then(() => {
    console.log('deleted all users');
    Post.deleteMany({}).then(() => console.log('deleted all posts'))


    User.create({
        name:"Taylor",
        username: "taylor",
        email: "taylor@gmail.com"
    }).then(taylor => {
        Post.create({
            title: "Juice",
            link: "https://open.spotify.com/embed/track/0k664IuFwVP557Gnx7RhIl",
            caption: "My fav song!!!",
            posted: taylor.id
        }).then(song => {
            taylor.posts.push(song);
            taylor.save();
            console.log('created taylor-juice');
        });
    });

    User.create({
        name: "Big Lisa",
        username: "biglis123",
        email: "biglis@biglis.com"
    }).then(lis => {
        Post.create({
            title: "Trophies",
            link: "https://open.spotify.com/embed/track/4FseJ7iZy0wbgJZjtddLSJ",
            caption: "My fav song, Trophies!!!",
            posted: lis.id
        }).then(song => {
            lis.posts.push(song);
            lis.save();
           console.log(lis.posts[0])
            console.log("created big lis");
        });
    })

    User.create({
        name: "Frida",
        username: "frida123",
        email: "frida@gmail.com"
    }).then(frida => {
        Post.create({
            title: "The Less I Know The Better",
            link: "https://open.spotify.com/embed/track/6K4t31amVTZDgR3sKmwUJJ",
            caption: "I love Tame!!!",
            posted: frida.id
        }).then(song => {
            frida.posts.push(song);
            frida.save();
            console.log("created Frida");
        });
    })
       
    })
        
    .catch(err => console.log(err, 'hello in seedJS'))
    



