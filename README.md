# Joke API RSS Feed

This is an extension for the Joke API project, which publishes the latest jokes in RSS form.

It transforms the XML version of the response to the /jokes endpoint into an RSS document using
XSLT (compiled into a *.sef.json file).

All written in Javascript with Express, with Axios and SaxonJS doing the HTTP calls and the XSL transformation respectively.

Results can be seen here: [Joke API RSS Endpoint](https://davidquinterogranadillo.site/feed/jokeapi.rss)

## Things to-do

- Use Redis for storage of the API token.
- Migrate project to Typescript