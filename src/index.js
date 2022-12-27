const express = require('express');
const apiAuth = require('./middlewares/api-auth.middleware.mjs').default;
const feedController = require('./controllers/feed.controller.mjs').default;

const app = express();

// Feed controller
app.get('/jokeapi.rss', feedController).use(apiAuth);

app.listen(process.env.LISTENING_PORT, () => {
    console.log("Let's rock");
});
