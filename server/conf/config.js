/**
 * Created by romo on 1/8/14.
 */
module.exports = {
	buildDir: '/../client/' + ((process.env.NODE_ENV === 'PRODUCTION') ? 'build' : 'build-dev'),
	port: 80,
	vhost: 'eventer.web',
    db: 'mongodb://localhost:27017/eventer'
};