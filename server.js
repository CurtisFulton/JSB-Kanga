const port = 3000;

var express = require('express');
var path = require('path');

var app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/gallery', (req, res) => {
	res.render('gallery');
});

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.listen(port, () => console.log("Listening on port " + port));