/**
 * Created by romo on 1/7/14.
 */
define(function (require, exports, module) {
    'use strict';
    var ng = require('angular');
    var router = require('router');
    var templates = require('templates');
    var app;

    app = ng.module('app', ['ui.router', 'templates.common']);
    app.config(router);
    module.exports = app;
});