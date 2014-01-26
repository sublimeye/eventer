/**
 * Created by romo on 1/26/14.
 */
module.exports = {
	checkPortIsOpened: function(port, fn) {
		var net = require('net');
		var tester = net.createServer()
				.once('error', function(err) {
					if (err.code != 'EADDRINUSE') {
						console.log('Error: ', err);
					}
					console.log('Port ' + port + ' is already taken by some other application; Either change that application port, or update port number in /server/config.js'.red);
					return true;
				})
				.once('listening', function() {
					tester.once('close', function() {
						fn(null, false)
					})
				.close()
				})
				.listen(port)
	}
};
