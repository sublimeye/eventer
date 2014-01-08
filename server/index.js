var express = require('express');
var config = require('./config').config;

var app = express();

app.configure(function() {
	app.use(express.static(__dirname + config.buildDir));
});

express().use(express.vhost(config.vhost, app)).listen(config.port);

console.log('Express app started on port ' + config.port + '. Should be available at: http://localhost/ \nVHost: '+ config.vhost +'. (Requires hosts file mapping: \"127.0.0.1 '+config.vhost+'\")');
