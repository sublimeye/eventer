/**
 * Created by Roman on 1/29/14.
 */
module.exports = function (app, passport) {
    /**
     * Routes
     */
    app.get('/auth/google', passport.authenticate('google'));
    app.get('/auth/google/return',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/feed'
        })
    );

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}