import { Axios } from 'axios';
import Config from '../config/config.js';

export const textAxiosClient = new Axios({
    baseURL: Config.apiUrl,
    timeout: 5000,
    responseType: 'text',
});

export const jsonAxiosClient = new Axios({
    baseURL: Config.apiUrl,
    timeout: 1000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    transformRequest: [request => JSON.stringify(request)],
    transformResponse: [response => JSON.parse(response)],
});
