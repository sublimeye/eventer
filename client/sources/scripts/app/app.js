/**
 * Created by romo on 1/7/14.
 */
define(function(require, exports, module) {
	'use strict';
	var ng = require('angular');
	var angularRoute = require('angularRoute');

	window.HelloCntl = function($scope) {
		$scope.name = 'Input name';
	};

	module.exports = ng.module('app', ['ngRoute']);
});