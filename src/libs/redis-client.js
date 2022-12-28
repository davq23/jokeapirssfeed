const { createClient } = require('redis');
const { Config } = require('../config/config.js');

const redisClient = createClient({
    url: Config.redisUrl,
});

(async () => {
    try {
        await redisClient.connect();
    } catch(error) {
        console.log(error);
    }
})();

module.exports = { redisClient };
