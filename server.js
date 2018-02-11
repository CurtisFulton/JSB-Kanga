const port = 3000;

var express = require('express');
var path = require('path');

var app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', (req, res) => {
	res.render('home');
});

app.listen(port, () => console.log("Listening on port " + port));