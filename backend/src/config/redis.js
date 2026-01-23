import redis from 'redis';
import logger from './logger.js';

let redisClient;

export const initRedis = async () => {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';
    
    redisClient = redis.createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 500),
      },
    });

    redisClient.on('error', (error) => {
      logger.error(`Redis error: ${error.message}`);
    });

    redisClient.on('connect', () => {
      logger.info('Redis connected');
    });

    await redisClient.connect();
    logger.info('Redis client initialized');
    return redisClient;
  } catch (error) {
    logger.error(`Redis connection error: ${error.message}`);
    throw error;
  }
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }
  return redisClient;
};

export default redisClient;
