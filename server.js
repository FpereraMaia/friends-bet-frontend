var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 5000;

// set the view engine to ejs
// app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/dist'));

// set the home page route

app.get('/', function(req, res) {
	
	//if you need to send html tag
	res.type("text/html");
	res.sendFile(__dirname + "/dist/index.html");
	// res.send("<p>hello world!</p>");
	// ejs render automatically looks in the views folder
	// res.render('dist/index');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});