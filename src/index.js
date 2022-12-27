import express from 'express';
import apiAuth from './middlewares/api-auth.middleware.mjs';
import feedController from './controllers/feed.controller.mjs';

const app = express();

// Feed controller
app.get('/jokeapi.rss', feedController).use(apiAuth);

app.listen(process.env.LISTENING_PORT, () => {
    console.log("Let's rock");
});