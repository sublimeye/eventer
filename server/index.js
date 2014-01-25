var express = require('express');
var config = require('./config');

var app = express();
app.configure(function () {
    app.use(express.static(__dirname + config.buildDir));
});

var isPortTaken = function (port, fn) {
    var net = require('net');
    var tester = net.createServer()
        .once('error', function (err) {
            if (err.code != 'EADDRINUSE') {
                return fn(err)
            }
            fn(null, true);
            return true;
        })
        .once('listening', function () {
            tester.once('close', function () {
                fn(null, false)
            })
                .close()
        })
        .listen(port)
};

isPortTaken(config.port, function (res, taken) {
    if (!taken) {
        express().use(express.vhost(config.vhost, app)).listen(config.port);
        console.log('Server running: http://' + config.vhost + '. (should be set in hosts file) On port: ' + config.port);
    } else {
        console.log('Port ' + config.port + ' is already taken by some other application; Either change that application port, or update port number in /server/config.js');
    }
});
