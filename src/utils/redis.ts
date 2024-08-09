import config from '../config/config';
import Redis from "ioredis";
import logger from '../logger';


const client = new Redis(config.redisHostUrl as string)
client.on('connect', () => logger.info('::> Redis Client Connected'));
client.on('error', (err) => console.log('<:: Redis Client Error', err));


export { client };



