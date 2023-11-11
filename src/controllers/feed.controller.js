const SaxonJS = require('saxon-js');
const { textAxiosClient } = require('../libs/http-client.js');
const { JokeService } = require('../services/joke.service.js');

const jokeService = new JokeService(textAxiosClient);

const feedController = (request, response) => {
    jokeService.getJokeXML(request.bearerToken)
        .then((jokeXMLResponse) => {
            const useXSLT = request.query.useXSLT === 'true';
            const transformOptions = {
                stylesheetFileName: useXSLT ? 'src/templates/stylesheet.xslt' : 'src/templates/stylesheet.sef.json',
                sourceText: jokeXMLResponse.data,
                destination: 'serialized',
                type: useXSLT ? 'xml' : 'json',
            };

            SaxonJS.transform(transformOptions, 'async')
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

module.exports = {
    feedController,
};
