const express = require('express');
const app = express();

var SpotifyWebApi = require('spotify-web-api-node');





var spotifyApi = new SpotifyWebApi({
  clientId: 'ad1c012acdaf423399f7c953f0bfe0f4',
  clientSecret: '3aead2ebaf2b45acbd3c66632450f697',
  redirectUri: 'local'
});

spotifyApi.setAccessToken('BQB5Qgtb3T3Tt8Qv6UOXPtbXui7HmfLcMpQyJDAreXJPJoZv2EExoOsOApJtIZ-ANeDDFkFr7R6HdbjuRRY');

// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//     function(data) {
//       console.log('Artist albums', data.body.items);
//     },
//     function(err) {
//       console.error(err);
//     }
//   );

  spotifyApi.searchTracks('Love').then(
      function(data) {
          console.log('search tracks by love', data.body.tracks.items[0].album.artists[0].name);
      }
  )

  spotifyApi.getRecommendations()
  