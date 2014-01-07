/**
 * Created by romo on 12/13/13.
 */
var express = require('express');
var app = express();
var oneDay = 86400000;
var User = {};
var mongoose = require('mongoose');
var mongoStore = require('connect-mongodb');
var models = require('./models');
var db, LoginToken;

var passport = require('passport'),
		GoogleStrategy = require('passport-google').Strategy;

app.configure('development', function() {
    app.set('db-uri', 'mongodb://localhost/eventer-dev');
});

app.configure(function() {
	app.use(express.compress());
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.static(__dirname + '/../client/build-dev', {maxAge: oneDay}));
	app.use('/templates', express.static(__dirname + '/../client/sources/templates', {maxAge: 1}));
	app.use(express.session({ store: mongoStore(app.set('db-uri')), secret: 'topsecret' }));
});

models.defineModels(mongoose, function() {
	app.User = User = mongoose.model('User');
	app.LoginToken = LoginToken = mongoose.model('LoginToken');
//	db = mongoose.connect(app.set('db-uri'));
});

function authenticateFromLoginToken (req, res, next) {
	var cookie = JSON.parse(req.cookies.logintoken);

	LoginToken.findOne({ email: cookie.email,
		series: cookie.series,
		token: cookie.token }, (function(err, token) {
		if (!token) {
			res.redirect('/sessions/new');
			return;
		}

		User.findOne({ email: token.email }, function(err, user) {
			if (user) {
				req.session.user_id = user.id;
				req.currentUser = user;

				token.token = token.randomToken();
				token.save(function() {
					res.cookie('logintoken', token.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
					next();
				});
			} else {
				res.redirect('/sessions/new');
			}
		});
	}));
}

function loadUser (req, res, next) {
	if (req.session.user_id) {
		User.findById(req.session.user_id, function(err, user) {
			if (user) {
				req.currentUser = user;
				next();
			} else {
				res.redirect('/sessions/new');
			}
		});
	} else if (req.cookies.logintoken) {
		authenticateFromLoginToken(req, res, next);
	} else {
		res.redirect('/sessions/new');
	}
}

passport.use(new GoogleStrategy({
			returnURL: 'http://eventer.web/auth/google/return',
			realm: 'http://eventer.web/'
		},
		function(identifier, profile, done) {
			console.log(identifier);
			console.log(profile);
			User.name = profile.displayName;

			done();

//    User.findOrCreate({ openId: identifier }, function(err, user) {
//      done(err, user);
//    });
		}
));

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return',
		passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/'
		})
);

app.get('/user/name', function(req, res) {
	if (User.name) {
		res.send(User.name);
	} else {
		res.send(401, {error: true, message: 'User is not logged in'});
	}
});

app.post('/hey', function(req, res) {
	res.send({data: 30000});
});

app.listen(3000);
