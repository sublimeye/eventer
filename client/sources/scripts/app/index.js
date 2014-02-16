/**
 * Created by romo on 1/8/14.
 */

/**
 *
 * Client-browser specific requirejs configuration.
 * Production version uses config specified in Grunt.
 *
 * */
require.config({
    baseUrl: '/js/app',
    paths: {
        angular: '../vendor/angular/angular',
        uiRouter: '../vendor/angular-ui-router/angular-ui-router',
        jquery: '../vendor/jquery/jquery',
        templates: 'templates/templates'
    },
    priority: [
        "angular"
    ],
    shim: {
        angular: {exports: 'angular'},
        uiRouter: ['angular'],
        templates: ['angular']
    },
    deps: ['bootstrap']
});
