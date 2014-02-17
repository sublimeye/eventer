/**
 * Created by romo on 1/7/14.
 */
define(['uiRouter', ''], function () {
    'use strict';

    var userRoles = {
        anon: 1,
        user: 2,
        root: 4
    };

    var accessLevels = {
        free: userRoles.anon | userRoles.user | userRoles.root,
        anon: userRoles.anon | userRoles.user | userRoles.root,
        user: userRoles.user | userRoles.root,
        root: userRoles.root
    };

    return ['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                access: accessLevels.free
            })
            .state('auth', {
                url: '/auth',
                templateUrl: 'partials/auth.html',
                access: accessLevels.free
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'partials/profile.html',
                access: accessLevels.user
            })
            .state('event/{id}/edit', {
                url: '/event/{id}/edit',
                templateUrl: 'partials/event-edit.html',
                access: accessLevels.user
            })
            .state('event/{id}/view', {
                url: '/event/{id}/view',
                templateUrl: 'partials/event-view.html',
                access: accessLevels.user
            });
    }];

});