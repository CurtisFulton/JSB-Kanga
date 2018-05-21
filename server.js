const port = 3000;

var express = require('express');
var path = require('path');

var app = express();

require('dotenv').config();

var bodyParser = require('body-parser');
var mailer = require('express-mailer');

// Public directory
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

// Mailer
mailer.extend(app, {
	from : 'Quote_Request@Gmail.com',
	host : 'smtp.gmail.com',
	secureConnection : true,
	port : 465,
	transportMetho : 'SMTP',
	auth : {
		user : process.env.FROM_EMAIL,
		pass : process.env.PASSWORD
	}
});

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

app.get('/submitted', (req, res) => {
	res.render('submitted');
});

app.post('/submit_quote', (req, res) => {
	console.log(req.body);

	var name = req.body.fname + " " + req.body.lname;
	var number = req.body.number; 
	var suburb = req.body.suburb; 
	var email = req.body.email; 
	var address = req.body.address; 
	var description = req.body.description; 

	app.mailer.send('email-template', {
		to : process.env.TO_EMAIL,
		subject : 'Quote Reqest for ' + name,
		name : name,
		number : number,
		suburb : suburb,
		email : email,
		address : address,
		description : description
	}, function (err) {
		if (err){
			console.log(err);
		} else {
			res.redirect('/submitted');
		}
	});
});

app.listen(port, () => console.log("Listening on port " + port));