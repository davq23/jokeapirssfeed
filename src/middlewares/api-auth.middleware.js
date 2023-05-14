const { jsonAxiosClient } = require('../libs/http-client.js');
const { Config } = require('../config/config.js');
const { AuthService } = require('../services/auth.service.js');
const { redisClient } = require('../libs/redis-client.js');

const authService = new AuthService(jsonAxiosClient);

const apiAuth = async (request, response, next) => {
    try {
        let authResponse = null;
        let bearerToken = await redisClient.get('JOKE_API_AUTH_TOKEN');

        if (!bearerToken) {
            bearerToken = null;
            authResponse = await authService.authenticate(Config.user, Config.password);

            if (authResponse.data.status === 200) {
                bearerToken = authResponse.data.data.token;
                await redisClient.set('JOKE_API_AUTH_TOKEN', authResponse.data.data.token);
                await redisClient.expireAt('JOKE_API_AUTH_TOKEN', authResponse.data.data.expires_at);
            }
        }

        request.bearerToken = bearerToken;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    if (request.bearerToken) {
        next();
    } else {
        response.status(400);
        response.end();
    }
};

module.exports = { apiAuth };
