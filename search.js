
const express = require('express');
const app = express();
const hbs = require('hbs');
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: 'ad1c012acdaf423399f7c953f0bfe0f4',
    clientSecret:'3aead2ebaf2b45acbd3c66632450f697',
    redirectUri:'http://localhost:8888/callback' 
})



spotifyApi.setAccessToken('BQBwwUUmgXLxBIZIj-NHcR6rS8Y_2AJAwW7bh1b1kuMIqrnaLFWG7bZp41PYocFfuQ6mbdK9ytNkyyyZAhNyg6Vep5VJuV4naq-WpkOnIdgdG8tSevRNOrGk8JTLAJHy5hWpXZqCigsFjqmVQ5iRErpJrRYIZ-b-fvZt');


app.get('', (req, res) => {
    spotifyApi.searchTracks('artist:Justin')
  .then(function(data) {
    console.log('Search tracks by "Justin" in the artist name', data.body.tracks.items);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})

// spotifyApi.searchTracks('artist:Justin')
//   .then(function(data) {
//     console.log('Search tracks by "Justin" in the artist name', data.body.tracks.items);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });

  module.exports = spotifyApi;