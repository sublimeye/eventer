/**
 * Created by romo on 12/13/13.
 */
var express = require('express');
var app = express();

var oneDay = 86400000;

app.configure(function() {
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/../client/build-dev', {maxAge: oneDay}));
});

app.post('/hey', function(req, res) {
	res.send({data: 30000});
});

app.listen(3000);
