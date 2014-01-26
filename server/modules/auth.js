var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var User = {};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
			returnURL: 'http://eventer.web/auth/google/return',
			realm: 'http://eventer.web/'
		},
		function(identifier, profile, done) {
			console.log('profile: ', profile);
			User = profile;
			done(null, User);
//    User.findOrCreate({ openId: identifier }, function(err, user) {
//      done(err, user);
//    });

		}
));

module.exports = passport;