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
//    angularRoute: '../vendor/angular-route/angular-route',
    angularRoute: '../vendor/angular-ui-router/',
    jquery: '../vendor/jquery/jquery',
    templates: 'templates/templates'
  },
  priority: [
    "angular"
  ],
  shim: {
    angular: {exports: 'angular'},
    angularRoute: ['angular'],
    templates: ['angular']
  },
  deps: ['bootstrap']
});
