var colors = require('colors');
var mongoose = require('mongoose');
var express = require('express');
var config = require('./conf/config');
var network = require('./modules/network-common');
var passportAuth = require('./modules/auth');
var flash = require('connect-flash');
var routes = require('routes');

var app = express();

app.configure(function() {
//	app.use(express.logger());
	app.use(express.cookieParser()); // read cookies (needed for auth)
//	app.use(express.bodyParser()); // get information from html forms
	app.use(express.session({ secret: 'secret'}));
	app.use(passportAuth.initialize());
	app.use(passportAuth.session());
//	app.use(app.router);
	app.use(express.static(__dirname + config.buildDir));
    app.use(flash());
});

require('./routes')(app, passportAuth);

mongoose.connect(config.db);

/**
 * Check if config.port is opened and Launch the server / start listening;
 */
network.checkPortIsOpened(config.port, function() {
	express().use(express.vhost(config.vhost, app)).listen(config.port);
	console.log('Server running: http://' + config.vhost + '. (should be set in hosts file) On port: ' + config.port);
});


// create a user model
/*
var User = mongoose.model('User', {
  oauthID: Number,
  name: String
});
*/
