const { HttpService } = require('./http.service.js');

module.exports.AuthService = class AuthService extends HttpService {
    async authorize(bearerToken) {
        return this.client.get('/users/whoiam', {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        });
    }

    async authenticate(email, password) {
        return this.client.post('/auth/login', { user: email, password });
    }
};
