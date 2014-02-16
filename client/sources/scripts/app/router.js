/**
 * Created by romo on 1/7/14.
 */
define(function (require) {
    'use strict';
    var uiRouter = require('uiRouter');

    return ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html'
            })
            .state('auth', {
                url: '/auth',
                templateUrl: 'partials/auth.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'partials/profile.html'
            })
            .state('event/{id}/edit', {
                url: '/event/{id}/edit',
                templateUrl: 'partials/event-edit.html'
            })
            .state('event/{id}/view', {
                url: '/event/{id}/view',
                templateUrl: 'partials/event-view.html'
            })
    }];

});