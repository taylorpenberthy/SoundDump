const express = require('express');
const parser = require('body-parser');
const app = express();
const methodOverride = require('method-override');
const hbs = require('hbs');
const cors = require('cors');

require('dotenv').config();



app.set('view engine', 'hbs');

app.use(methodOverride('_method'));
const postsController = require('./controllers/posts');
const usersController = require('./controllers/users');

app.use('/assets', express.static('public'));



app.use(parser.urlencoded({extended: true}));

app.use(parser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.redirect('/posts/')
})

app.use('/posts/', postsController);
app.use('/users/', usersController);

app.set("port", process.env.PORT || 5000 );



app.listen(app.get("port"), () => {
    console.log(`✅ PORT: ${app.get("port")} 🌟`);
  });







