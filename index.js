require('dotenv').config();

const server = require('./src/server/server');
const mongo = require('./src/config/mongo');
const logger = require('./src/lib/logger');

(async () => {
    try {
        await mongo.connect();
        server.listen();
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
