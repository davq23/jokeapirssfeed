import { createClient } from 'redis';
import Config from '../config/config.mjs';

const redisClient = createClient({
    url: Config.redisUrl,
});

export default redisClient;
