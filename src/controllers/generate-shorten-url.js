const axios = require('../utils/axios')
const ShortenUrl = require('../models/shorten-url')
const { Validate } = require('../utils/validate');
const bodySchema = require('../validate-input/generate-shorten-url');
const service = require('../services/service')
const redis = require('../utils/redis')
const config = require('../config/config')


const generateShortenUrl = async (req, res) => {
    
    try { 
        console.log("generateShortenUrl")
        let invalid = Validate.body(req.body, bodySchema);
        if(invalid) {
            return res.status(422).send("invalid body");
        }
        const longUrl = req.body.longUrl

        // check catching first 
        const catchingLongUrl = await redis.getRedis(longUrl)
        console.log("catchingLongUrl: ", catchingLongUrl)
        if (catchingLongUrl) {
            await redis.resetTimeRedis(longUrl)
            return res.send(`${config.URL}:${config.PORT}/${catchingLongUrl}`)
        }
        // check url is real url
        const resAxios = await axios.connectAxios("get", longUrl)
        console.log("resAxios:", resAxios.status)
        if (resAxios.status != 200) {
            return res.status(400).send("please check longUrl is url");
        }
        // check is not duplicate
        const findData = await ShortenUrl.findOne({
            longUrl,
        })
        console.log("findData:", findData)
        // if exsits, return short url
        if (findData) {
            await redis.setRedis(longUrl, findData.shortUrl)
            return res.send(`${config.URL}:${config.PORT}/${findData.shortUrl}`)
        }
        // generate short url
        const shortUrl = await service.generateShortenUrl(longUrl)
        // set catching
        await redis.setRedis(longUrl, shortUrl)
        return res.send(`${config.URL}:${config.PORT}/${shortUrl}`)
    } catch(err) {
        console.log(err)
        return res.status(500).send(err);
    }
};

module.exports = generateShortenUrl