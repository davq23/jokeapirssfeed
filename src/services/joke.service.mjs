import HttpService from './http.service.mjs';

export default class JokeService extends HttpService {
    getJokeXML(bearerToken) {
        return this.client.get('/jokes?format=xml', {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        });
    }
}
