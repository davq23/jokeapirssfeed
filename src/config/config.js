const dotenv = require('dotenv');

dotenv.config();

const Config = {
    apiUrl: process.env.API_URL,
    user: process.env.USER,
    password: process.env.PASSWORD,
    redisUrl: process.env.REDIS_URL,
};

module.exports = { Config };
