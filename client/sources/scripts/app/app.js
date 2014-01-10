/**
 * Created by romo on 1/7/14.
 */
define([
	'angular'
], function(ng) {
	'use strict';

	window.HelloCntl = function($scope) {
		$scope.name = 'Input name';
	};

	// Declare app level module which depends on filters, and services
	return ng.module('app', []);
});
