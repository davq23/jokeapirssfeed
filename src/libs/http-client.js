const { Axios } = require('axios');
const { Config } = require('../config/config.js');

const textAxiosClient = new Axios({
    baseURL: Config.apiUrl,
    timeout: 5000,
    responseType: 'text',
});

const jsonAxiosClient = new Axios({
    baseURL: Config.apiUrl,
    timeout: 1000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    transformRequest: [(request) => JSON.stringify(request)],
    transformResponse: [(response) => JSON.parse(response)],
});

module.exports = {
    jsonAxiosClient,
    textAxiosClient,
};
