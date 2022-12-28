const { HttpService } = require('./http.service.js');

module.exports.JokeService = class JokeService extends HttpService {
    getJokeXML(bearerToken) {
        return this.client.get('/jokes?format=xml', {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        });
    }
};
