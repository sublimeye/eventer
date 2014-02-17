/**
 * Created by Roman on 1/29/14.
 */
module.exports = function (app, passport) {

    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {

            if (err) {
                return next(err);
            }

            if (!user) {
                return res.send({ok: false, msg: req.flash('signupMessage') });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return res.send({ok: true, email: user.local.email});
            });
        })(req, res, next);
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================

    app.post('/signin', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {

            if (err) {
                return next(err);
            }

            if (!user) {
                return res.send({ok: false, msg: 'no user ' + req.flash('signinMessage') });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return res.send({ok: true, email: user.local.email});
            });
        })(req, res, next);
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /**
     * Routes
     */
    /*
     app.get('/auth/google', passport.authenticate('google'));
     app.get('/auth/google/return',
     passport.authenticate('google', {
     successRedirect: '/#/profile',
     failureRedirect: '/#/feed'
     })
     );
     */

};

// route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {
    console.log('is logged in?!');
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return false;
    }

    // if user is authenticated in the session, carry on
    return next();
}