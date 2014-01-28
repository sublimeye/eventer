var colors = require('colors');
var mongoose = require('mongoose');
var express = require('express');
var config = require('./config');
var network = require('./modules/network-common');
var passportAuth = require('./modules/auth');
var app = express();

app.configure(function() {
//	app.use(express.logger());
	app.use(express.cookieParser());
//	app.use(express.bodyParser());
	app.use(express.session({ secret: 'secret'}));
	app.use(passportAuth.initialize());
	app.use(passportAuth.session());
//	app.use(app.router);
	app.use(express.static(__dirname + config.buildDir));
});

/**
 * Check if config.port is opened and Launch the server / start listening;
 */
network.checkPortIsOpened(config.port, function() {
	express().use(express.vhost(config.vhost, app)).listen(config.port);
	console.log('Server running: http://' + config.vhost + '. (should be set in hosts file) On port: ' + config.port);
});

/**
 * Routes
 */
app.get('/auth/google', passportAuth.authenticate('google'));
app.get('/auth/google/return',
		passportAuth.authenticate('google', {
			successRedirect: '/#/profile',
			failureRedirect: '/#/feed'
		})
);

/* TEMPORARY AUTH CODE */

// connect to the database
/*mongoose.connect('mongodb://localhost/passport-example');

// create a user model
var User = mongoose.model('User', {
  oauthID: Number,
  name: String
});*/
