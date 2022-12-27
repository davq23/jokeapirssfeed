import { createClient } from "redis";
import Config from "../config/config.js";

const redisClient = createClient({
    url: Config.redisUrl,
});

export default redisClient;