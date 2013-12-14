/**
 * Created by romo on 12/13/13.
 */
var express = require('express');
var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.configure(function() {
    app.use(express.bodyParser());
    app.use(allowCrossDomain);
});

app.post('/hey', function(req, res) {
	res.send({data: 100});
});

app.listen(3000);