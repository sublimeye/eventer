/**
 * Created by romo on 1/7/14.
 */
define(function (require) {
  'use strict';
  var uiRouter = require('uiRouter');

  return ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('/home', {
        url: "/home",
        templateUrl: 'partials/home.html'
      })
      .state('route1', {
        url: "/route1",
        views: {
          "viewA": { template: "route1.viewA" },
          "viewB": { template: "route1.viewB" }
        }
      })
      .state('route2', {
        url: "/route2",
        views: {
          "viewA": { template: "route2.viewA" },
          "viewB": { template: "route2.viewB" }
        }
      })
  }];

});