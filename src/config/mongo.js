const mongoose = require('mongoose');
const logger =  require('../lib/logger');

class Mongo {
    /**
     * Set initial options and handle connection events
     * @param {string} url
     */
    constructor(url) {
        this.url = url;
        this.options = {
            reconnectTries: 5,
            reconnectInterval: 2000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connection.on('connected', () => logger.log('mongo connected'));
        mongoose.connection.on('error', () => logger.error('mongo error'));
        mongoose.connection.on('disconnected', () => logger.error('mongo disconnected'));
        mongoose.connection.on('reconnectFailed', () => logger.error('mongo failed'));
    }

    /**
     * Starts mongo connection with constructor options
     */
    async connect() {
        await mongoose.connect(this.url, this.options);
    }

    /**
     * Finish mongo connection
     */
    async disconnect() {
        await mongoose.disconnect();
    }
}

module.exports = new Mongo(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_SCHEMA}`);
