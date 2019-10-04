const express = require('express');
const app = express();
const hbs = require('hbs');
const postsController = require('./controllers/posts');
const parser = require('body-parser');
const methodOverride = require('method-override');
app.set('view engine', 'hbs');
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.use(methodOverride('_method'));







app.get('/', (req, res) => {
    res.redirect('/posts')
})

app.use('/posts', postsController);

app.use('/assets', express.static('public'));

app.use(express.static('public'));





app.listen(5000, () => console.log("Running on port 5000!"))