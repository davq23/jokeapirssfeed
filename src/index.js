const express = require('express');
const { apiAuth } = require('./middlewares/api-auth.middleware.js');
const { feedController } = require('./controllers/feed.controller.js');

const app = express();

// Feed controller
app.get('/jokeapi/jokeapi.rss', feedController).use(apiAuth);

app.listen(process.env.LISTENING_PORT, () => {
    console.log("Let's rock");
});
