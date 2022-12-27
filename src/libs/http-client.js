const { Axios } = require('axios');
const { Config } = require('../config/config.js');

exports.textAxiosClient = new Axios({
    baseURL: Config.apiUrl,
    timeout: 5000,
    responseType: 'text',
});

exports.jsonAxiosClient = new Axios({
    baseURL: Config.apiUrl,
    timeout: 1000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    transformRequest: [(request) => JSON.stringify(request)],
    transformResponse: [(response) => JSON.parse(response)],
});
