var express = require('express');
var config = require('./config');

var app = express();
app.configure(function() {
	app.use(express.static(__dirname + config.buildDir));
});

express().use(express.vhost(config.vhost, app)).listen(config.port);

console.log('Server: http://'+ config.vhost + ':' + config.port);
