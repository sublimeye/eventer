/**
 * Created by romo on 1/7/14.
 */
define(function(require, exports, module) {
	'use strict';
	var ng = require('angular');
  var templates = require('templates');
  var router = require('router');
  var app;

	app = ng.module('app', ['ui.router', 'templates-main']);
  app.config(router);
  module.exports = app;
});