require.config({
    paths: {
        angular: '../vendor/angular/angular',
        angularRoute: '../vendor/angular-route/angular-route',
        jquery: '../vendor/jquery/jquery'
    },
    priority: [
        "angular"
    ],
    shim: {
        angular: {
            exports: 'angular'
        }
    },
    deps: []
});
