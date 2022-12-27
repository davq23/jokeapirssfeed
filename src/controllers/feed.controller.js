import SaxonJS from 'saxon-js';
import { textAxiosClient } from '../libs/http-client.js';
import JokeService from '../services/joke.service.js';

const jokeService = new JokeService(textAxiosClient);

export const feedController = (request, response) => {
    jokeService.getJokeXML(request.bearerToken)
        .then((jokeXMLResponse) => {
            SaxonJS.transform({
                stylesheetFileName: 'src/templates/stylesheet.sef.json',
                sourceText: jokeXMLResponse.data,
                destination: 'serialized',
            }, 'async')
            .then((output) => {
                response.writeHead(200, {
                    'Content-Type': 'application/rss+xml;charset=UTF-8',
                    'Content-Disposition': 'attachment; filename="jokeapi.rss"',
                });
                response.write(output.principalResult);
                response.end();
            });
        });
};
