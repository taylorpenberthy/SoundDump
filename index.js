const express = require('express');
const parser = require('body-parser');
const app = express();
const methodOverride = require('method-override');
const hbs = require('hbs');
const cors = require('cors');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

app.use(parser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'hbs');
app.use(parser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
const postsController = require('./controllers/posts');
const usersController = require('./controllers/users');
app.use('/posts/', postsController);
app.use('/users/', usersController);

var client_id = 'ad1c012acdaf423399f7c953f0bfe0f4';
var client_secret = '3aead2ebaf2b45acbd3c66632450f697';

passport.serializeUser(function(user, done) {
    done(null, user.id); 
   
});



// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(
    new SpotifyStrategy({
        clientID: client_id,
        clientSecret: client_secret,
        callbackURL: 'http://localhost:5000/posts'
    },
    function(accessToken, refreshToken, profile, done) {
    User.findOne({'spotify.id': profile.id}, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'spotify',
                spotify: profile._json
            });
            user.save(function(err) {
                if (err) {
                    console.log(err);
                    return done(err, user);
                }
            
            else {
                return done(err, user);
            }
        }

            )
        }
        
    });
}
    )
);


app.get('/auth/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
}), function(req, res) {
  
});

app.get(
    '/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );

// app.get('/', function(req, res) {
//     res.render('indexlogin', {user: req.user})
// })

app.get('/account', ensureAuthenticated, function(req, res) {
    res.render('account', { user: req.user });
  });


app.get('/login', (req, res) => {
    res.render('login', {user: req.user})
})


// app.get('/', (req, res) => {
//     res.redirect('/posts/')
// })


app.use('/assets', express.static('public'));



// var SpotifyWebApi = require('spotify-web-api-node');

// var spotifyApi = new SpotifyWebApi({
//     clientId: 'ad1c012acdaf423399f7c953f0bfe0f4',
//     clientSecret:'3aead2ebaf2b45acbd3c66632450f697',
//     redirectUri:'http://localhost:8888/callback' 
// })



// spotifyApi.setAccessToken('BQBwwUUmgXLxBIZIj-NHcR6rS8Y_2AJAwW7bh1b1kuMIqrnaLFWG7bZp41PYocFfuQ6mbdK9ytNkyyyZAhNyg6Vep5VJuV4naq-WpkOnIdgdG8tSevRNOrGk8JTLAJHy5hWpXZqCigsFjqmVQ5iRErpJrRYIZ-b-fvZt');

// app.apiUrl = 'https://api.spotify.com/v1';



// app.get('', (req, res) => {
//     spotifyApi.searchTracks('artist:Justin')
//   .then(function(data) {
//     console.log('Search tracks by "Justin" in the artist name', data.body.tracks.items);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });

// })

// var SpotifyWebApi = require('spotify-web-api-node');

// // credentials are optional
// var spotifyApi = new SpotifyWebApi({
//     clientId: 'ad1c012acdaf423399f7c953f0bfe0f4',
//     clientSecret: '3aead2ebaf2b45acbd3c66632450f697',
//     redirectUri: 'localhost:5000/posts'
//   });
  
//   spotifyApi.setAccessToken('BQC7P-Paszuy4G6f6m4bhuCQ35Iyao7LUvZ6oyC0rFRaVhKwJJiTMEdNp5TcX1lAijgD01tV2BHYL441Vgc');
// app.get('/songs', (req, res) => {
//     spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//     res.send(
//           function(data) {
//               data.body.items;
//           },
//           function(err) {
//             console.error(err);
//           })
//         )
      
// })

app.set("port", process.env.PORT || 5000 )

app.listen(app.get("port"), () => {
    console.log(`✅ PORT: ${app.get("port")} 🌟`);
  });

// app.listen(5000, () => console.log("Running on port 5000!"))


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }



