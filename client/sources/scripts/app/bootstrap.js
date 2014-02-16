define(function (require) {
    'use strict';

    var ng = require('angular');
    var app = require('app');

    ng.element(document.getElementsByTagName('html')[0]).ready(function () {
        ng.bootstrap(document, [app.name]);
    });
});