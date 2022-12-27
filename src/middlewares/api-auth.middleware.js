const { jsonAxiosClient } = require('../libs/http-client.js');
const { Config } = require('../config/config.js');
const AuthService = require('../services/auth.service.js');

let bearerToken = '';

const authService = new AuthService(jsonAxiosClient);

const apiAuth = async (request, response, next) => {
    try {
        let authResponse = null;

        authResponse = await authService.authorize(bearerToken);

        if (authResponse.data.status !== 200) {
            bearerToken = null;
            authResponse = await authService.authenticate(Config.user, Config.password);

            if (authResponse.data.status === 200) {
                bearerToken = authResponse.data.data.token;
            }
        }

        request.bearerToken = bearerToken;
    } catch (error) {
        console.log(error);
    }

    if (request.bearerToken) {
        next(request, response);
    } else {
        response.status(400);
        response.end();
    }
};

exports.apiAuth = apiAuth;
