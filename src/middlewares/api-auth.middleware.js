const { jsonAxiosClient } = require('../libs/http-client.js');
const { Config } = require('../config/config.js');
const { AuthService } = require('../services/auth.service.js');

let bearerToken = '';

const authService = new AuthService(jsonAxiosClient);

const apiAuth = async (request, response, next) => {
    try {
        let authResponse = null;

        try {
            authResponse = await authService.authorize(bearerToken);
            console.log(authResponse);
        } catch(error) {
            console.log("ERROR: "+error);
        }

        if (!authResponse.data || authResponse.data.status !== 200) {
            bearerToken = null;
            authResponse = await authService.authenticate(Config.user, Config.password);

            console.log(authResponse);
            if (authResponse.data.status === 200) {
                bearerToken = authResponse.data.data.token;
            }
        }
        
        console.log("BEARER:"+bearerToken);

        request.bearerToken = bearerToken;
    } catch (error) {
        console.log("ERROR: "+error);
    }

    if (request.bearerToken) {
        console.log(request.bearerToken);
        next();
    } else {
        response.status(400);
        response.end();
    }
};

module.exports = { apiAuth };
