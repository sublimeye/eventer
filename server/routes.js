/**
 * Created by Roman on 1/29/14.
 */
module.exports = function (app, passport) {
    /**
     * Routes
     */
    app.get('/auth/google', passportAuth.authenticate('google'));
    app.get('/auth/google/return',
        passportAuth.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/feed'
        })
    );

};