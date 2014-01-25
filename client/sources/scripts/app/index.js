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
		angularRoute: '../vendor/angular-route/angular-route',
		jquery: '../vendor/jquery/jquery'
	},
	priority: [
		"angular"
	],
	shim: {
		angular: {exports: 'angular'},
		'angularRoute': ['angular']
	},
	deps: []
});

define(function(require, exports, module) {
	var ng = require('angular');
	var app = require('app');
	var router = require('router');

	ng.element(document.getElementsByTagName('html')[0]).ready(function() {
		ng.bootstrap(document, ['app']);
	});
});