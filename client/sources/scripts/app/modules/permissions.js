/**
 * Created by Roman on 2/17/14.
 */
angular.module('angular-client-side-auth')
    .factory('Auth', function ($http, $rootScope, $cookieStore) {

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

        $rootScope.accessLevels = accessLevels;
        $rootScope.userRoles = userRoles;

        return {
            authorize: function (accessLevel, role) {
                if (role === undefined)
                    role = $rootScope.user.role;
                return accessLevel &amp; role;
            },

            isLoggedIn: function (user) {
                if (user === undefined)
                    user = $rootScope.user;
                return user.role === userRoles.user || user.role === userRoles.root;
            },

            register: function (user, success, error) {
                $http.post('/register', user).success(success).error(error);
            },

            login: function (user, success, error) {
                $http.post('/login', user).success(function (user) {
                    $rootScope.user = user;
                    success(user);
                }).error(error);
            },

            logout: function (success, error) {
                $http.post('/logout').success(function () {
                        $rootScope.user = {
                            username: '',
                            role: userRoles.public
                        };
                        success();
                    }
                ).error(error);
            },

            accessLevels: accessLevels,
            userRoles: userRoles
        };
    });