/* Loading dependencies */
var mongoose = require('mongoose');
var express = require('express');
var config = require('./config/config');
var network = require('./modules/network-common');
var passportAuth = require('./modules/auth');
var flash = require('connect-flash');
var app = express();

/* connecting to database */
mongoose.connect(config.db);

/* express application configuration */
app.configure(function () {
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms

    // required for passport
    app.use(express.session({ secret: 'secret'}));
    app.use(passportAuth.initialize());
    app.use(passportAuth.session());
    app.use(flash());

    // handle static resources (images, styles, etc)
    app.use(express.static(__dirname + config.buildDir));
});

/* Load routing rules */
require('./app/routes')(app, passportAuth);

/* Check if config.port is opened and Launch the server / start listening; */
network.checkPortIsOpened(config.port, function () {
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
