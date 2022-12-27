import SaxonJS from 'saxon-js';
import { textAxiosClient } from '../libs/http-client.mjs';
import JokeService from '../services/joke.service.mjs';

const jokeService = new JokeService(textAxiosClient);

const feedController = (request, response) => {
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

export default feedController;
