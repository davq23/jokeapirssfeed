const express = require('express');
const { feedRouter } = require('./router/feed.router.js');

const app = express();

// Feed controller
app.use('/feed', feedRouter);

app.listen(process.env.LISTENING_PORT, () => {
    console.log("Let's rock");
});
