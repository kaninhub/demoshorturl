const redis = require("redis");
const config = require('../config/config')

let client = ""
const connectRedis = async () => {
    client = redis.createClient({
        socket: {
            host: config.REDIS_HOST,
            port: config.REDIS_PORT,
        }
    });
    await client.connect()
};

const getRedis = async (keyUrl) => {
    const valueUrl = await client.get(keyUrl)
    return valueUrl
};

const setRedis = async (keyUrl, valueUrl) => {
    await client.set(keyUrl, valueUrl)
    await client.expire(keyUrl, 60 * 60 * 24 * 120)
};

const resetTimeRedis = async (keyUrl) => {
    await client.expire(keyUrl, 60 * 60 * 24 * 120)
};

module.exports = {
    connectRedis,
    getRedis,
    setRedis,
    resetTimeRedis,
}