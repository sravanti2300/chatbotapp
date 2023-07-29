const redis = require('redis');
const Promise = require('bluebird');
const { logger } = require('../../config/logger');
const { redisDetails } = require('../../config/vars');

Promise.promisifyAll(redis);

const client = redis.createClient({ host: redisDetails.endpoint, port: redisDetails.port });

client.on('connect', () => {
  logger.info('Redis client connected to database index');
});

client.on('error', (err) => {
  logger.error(`Redis error: ${err}`);
  process.exit(-1);
});

const getFromCache = async (key) => {
  try {
    const cachedData = await client.getAsync(key);
    if (!cachedData) {
      return {};
    }
    return JSON.parse(cachedData);
  } catch (error) {
    logger.error('Redis error: ', error);
    return {};
  }
};

const setToCache = async (key, value) => {
  let cachedValue = {};
  try {
    await client.setAsync(key, JSON.stringify(value), 'EX', redisDetails.sessionExpiry);
    cachedValue = value;
  } catch (err) {
    logger.info('Failed to set data to redis cache due to ', err);
    cachedValue = {};
  }
  return cachedValue;
};

const deleteFromCache = async (key) => {
  const cachedValue = {};
  try {
    await client.delAsync(key);
  } catch (error) {
    logger.error('Redis error: ', error);
  }
  return cachedValue;
};

const expireCache = (key, expiryDate) => {
  client.expireat(key, parseInt((new Date(expiryDate) / 1000), 10));
};

exports.getFromCache = getFromCache;
exports.setToCache = setToCache;
exports.deleteFromCache = deleteFromCache;
exports.expireCache = expireCache;
