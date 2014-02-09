/**
 * Created by Roman on 1/29/14.
 */
module.exports = function (app, passport) {

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function (req, res) {

    // render the page and pass in any flash data if it exists
    // res.render('login.ejs', { message: req.flash('loginMessage') });
    console.log('login page request');
  });

  // =====================================
  // SIGNUP ==============================
  // =====================================

	// process the signup form
/*
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/success', // redirect to the secure profile section
		failureRedirect : '/fail', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
*/

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {

      console.log('req.message', req.flash('signupMessage'));
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.send({ok: false, msg: 'not logged in'});
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }

        return res.send({ok: true, email: user.local.email});
      });
    })(req, res, next);
  });

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res, arguments) {
//		res.render('profile.ejs', {
//			user : req.user // get the user out of session and pass to template
//		});
    console.log(req.flash('signupMessage'));
    res.send();
//    res.send({ok: 'Signed up: Prifle'}).end();
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

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
function isLoggedIn (req, res, next) {
  console.log('is logged in?!');
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    console.log('yes');
    return next();
  }

  // if they aren't redirect them to the home page
  console.log('/no');
  res.redirect('/');
}