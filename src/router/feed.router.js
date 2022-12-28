const { Router } = require('express');
const { feedController } = require('../controllers/feed.controller.js');
const { apiAuth } = require('../middlewares/api-auth.middleware.js');

const feedRouter = Router();

feedRouter.use(apiAuth);

feedRouter.get('/jokeapi.rss', feedController);

module.exports = {
    feedRouter,
};
