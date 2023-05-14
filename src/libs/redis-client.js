const { createClient } = require('redis');
const { Config } = require('../config/config.js');

const redisClient = createClient({
    url: Config.redisUrl,
});

(async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
})();

module.exports = { redisClient };
