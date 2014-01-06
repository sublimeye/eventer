/**
 * Created by romo on 12/13/13.
 */
var express = require('express');
var app = express();
var oneDay = 86400000;
var User = {};

var passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;

app.configure(function () {
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/../client/build-dev', {maxAge: oneDay}));
});

passport.use(new GoogleStrategy({
        returnURL: 'http://eventer.web/auth/google/return',
        realm: 'http://eventer.web/'
    },
    function (identifier, profile, done) {
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

app.post('/hey', function (req, res) {
    res.send({data: 30000});
});

app.listen(3000);
