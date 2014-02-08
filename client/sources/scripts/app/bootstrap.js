define(function (require) {
  var ng = require('angular');
  var app = require('app');
  var router = require('router');

  ng.element(document.getElementsByTagName('html')[0]).ready(function () {
    ng.bootstrap(document, ['app']);
  });
});