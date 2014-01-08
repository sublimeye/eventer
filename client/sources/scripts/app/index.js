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
		jquery: '../vendor/jquery/jquery',
		domReady: '../vendor/requirejs-domready/domReady'
	},
	priority: [
		"angular"
	],
	shim: {
		angular: {
			exports: 'angular'
		}
	},
	deps: []
});

require(['domReady!', 'angular', 'app'], function(document, ng) {
	ng.bootstrap(document, ['app']);
});
