var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var async = require('async');
var flash = require('connect-flash');
var router = express.Router();

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
app.use(flash()); 
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});


app.post('/item/:id', function (request, response) {
	connection.query("SELECT * FROM organicit where id = ?",[request.params.id], function (error, rows, fields) {
		if (!!error) {
			console.log('Error in the query');
		} else {
			response.render('item_info', { page_title: "Item",data: rows });
		}
	});
});

app.post('/category/:type', function (request, response) {
	connection.query("SELECT * FROM organicit where type = ?",[request.params.type], function (error, rows, fields) {
		if (!!error) {
			console.log('Error in the query');
		} else {
			response.render('items', { page_title: "Item",data: rows });
		}
	});
});

app.post('/cart/:id', function (request, response) {
	connection.query("insert into org_cart values(?)",[request.params.id], function (error, rows, fields) {
		if (!!error) {
			console.log('Error in the query');
		} else {
			response.redirect("http://localhost:1000/back.html");
		}
	});
});

app.listen(process.env.PORT || 1000);