const HttpService = require('./http.service.js');
const { redisClient } = require('../libs/redis-client.js');

module.exports = class AuthService extends HttpService {
    async authorize(bearerToken) {
        return redisClient.HGET('JOKEAPI_TOKEN').then((token) => {
            this.bearerToken = token;
        }).finally(() => this.client.get('/users/whoiam', {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            }));
    }

    authenticate(email, password) {
        return this.client.post('/auth/login', { user: email, password }).finally((response) => {
            if (response.data.data) {
                redisClient.HSET('JOKEAPI_TOKEN', response.data.data.token);
            }
        });
    }
};
