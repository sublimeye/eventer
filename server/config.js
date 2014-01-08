/**
 * Created by romo on 1/8/14.
 */
var config = {
	buildDir: '/../client/' + (process.env.NODE_ENV === 'PRODUCTION') ? 'build' : 'build-dev',
	port: 80,
	vhost: 'eventer.web'
};

exports.config = config;