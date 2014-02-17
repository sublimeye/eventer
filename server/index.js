/* Loading dependencies */
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var config = require('./config/config');
var network = require('./modules/network-common');
var app = express();

/* connecting to database */
mongoose.connect(config.db);
require('./modules/auth')(passport);  // pass passport for auth configuration

/* express application configuration */
app.configure(function () {
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms

    // required for passport
    app.use(express.session({ secret: 'secret'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    // handle static resources (images, styles, etc)
    app.use(express.static(__dirname + config.buildDir));
    app.use(app.router);
    app.use(redirectUnmatched);
});

/**
 * Redirect all unmatched by router requests to the same request.url with hash
 * to be handled by client-side application
 */
function redirectUnmatched (req, res) {
    res.redirect('/#' + req.url);
}

/* Load routing rules */
require('./app/routes')(app, passport);


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
