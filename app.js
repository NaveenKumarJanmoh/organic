var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var async = require('async');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'data',
	password : 'data',
	database : 'data'
});

var app = express();
app.set('view engine', 'ejs');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 3000);