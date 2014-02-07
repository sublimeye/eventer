/**
 * Created by romo on 1/7/14.
 */
define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/feed.html'
		});
		$routeProvider.when('/feed', {
			templateUrl: 'partials/feed.html'
		});

		$routeProvider.when('/profile', {
			templateUrl: 'partials/profile.html'
		});

		$routeProvider.otherwise({redirectTo: '/go'});
	}]);

});