require.config({
	deps: ['angular'],
	baseUrl: './js',
	paths: {
		angular: 'vendor/angular/angular',
		jquery: 'vendor/jquery/jquery'
	},
	shim: {
		'model': {
			exports: "model"
		}
	}
});
