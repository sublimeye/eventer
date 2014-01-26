var colors = require('colors');
var express = require('express');
var config = require('./config');
var network = require('./modules/network-common');
var passportAuth = require('./modules/auth');

var app = express();

app.configure(function() {
	app.use(express.static(__dirname + config.buildDir));
//	app.use(cookieParser());
//	app.use(bodyParser());
//	app.use(express.session({ secret: 'Hmm, secret'}));
	app.use(passportAuth.initialize());
	app.use(passportAuth.session());
});

network.checkPortIsOpened(config.port, function() {
	express().use(express.vhost(config.vhost, app)).listen(config.port);
	console.log('Server running: http://' + config.vhost + '. (should be set in hosts file) On port: ' + config.port);
});

app.get('/auth/google', passportAuth.authenticate('google'));
app.get('/auth/google/return',
		passportAuth.authenticate('google', {
			successRedirect: '/#/profile',
			failureRedirect: '/#/feed'
		})
);
