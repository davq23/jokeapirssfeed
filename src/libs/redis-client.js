const { createClient } = require('redis');
const { Config } = require('../config/config.js');

const redisClient = createClient({
    url: Config.redisUrl,
});

exports.redisClient = redisClient;
