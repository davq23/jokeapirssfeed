const rootController = (request, response) => {
    response.json({
        status: 200,
        message: 'Everything cool',
    });
};

module.exports = {
    rootController,
};
