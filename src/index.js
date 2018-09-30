// LIbraries
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
// Configuration
const config = require('./config');
// Constants
const CONSTANTS = require('./constants');
const STATUS = CONSTANTS.APP.STATUS;
const PATHS = CONSTANTS.PATHS;

/**
  * Initialize Server
  */
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

/**
  * Middleware
  */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
 * Start Server, Connect to DB & Require Routes
 */
server.listen(config.port, () => {
	// establish connection to mongodb
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db.uri, { useNewUrlParser: true });

	const db = mongoose.connection;

	db.on(STATUS.ERROR, (err) => {
	    console.error(err);
	    process.exit(1);
	});

	db.once(STATUS.OPEN, () => {
	    require(PATHS.ROUTES)(server);
	    console.log(`Server is listening on port ${config.port}`);
	});
});
