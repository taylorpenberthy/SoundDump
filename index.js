const express = require('express');
const parser = require('body-parser');
const app = express();
const methodOverride = require('method-override');
const hbs = require('hbs');
const cors = require('cors');


app.use(parser.json());
app.use(cors());


app.set('view engine', 'hbs');
app.use(parser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
const postsController = require('./controllers/posts');
app.use('/posts/', postsController);









app.get('/', (req, res) => {
    res.redirect('/posts/')
})


app.use('/assets', express.static('public'));


//map out request resopnse flow for app 




app.listen(5000, () => console.log("Running on port 5000!"))

