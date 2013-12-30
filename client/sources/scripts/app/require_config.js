require.config({
    deps: [],
    baseUrl: './js',
    paths: {
        jquery: 'vendor/jquery-2.0.3'
    },
    shim: {
        'model': {
            exports: "model"
        }
    }
});
