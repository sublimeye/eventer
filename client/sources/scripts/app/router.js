/**
 * Created by romo on 1/7/14.
 */
define(['uiRouter'], function () {
    'use strict';

    return ['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true);

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
            });
    }];

});