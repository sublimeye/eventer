require.config({
	paths: {
		angular: '../vendor/angular/angular',
		jquery: '../vendor/jquery/jquery',
		domReady: '../vendor/requirejs-domready/domReady'
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
