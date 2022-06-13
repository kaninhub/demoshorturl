const axios = require('../utils/axios')
const ShortenUrl = require('../models/shorten-url')
const service = require('../services/service')
const redis = require('../utils/redis')

const getFullUrl = async (req, res) => {
    
    try { 
        console.log("getFullUrl")
        
        const shortenText = req.params.shortenText
        
        console.log("shortenText:", shortenText)
        // find cating first
        const catchingShortUrl = await redis.getRedis(shortenText)
        console.log("catchingShortUrl: ", catchingShortUrl)
        if (catchingShortUrl) {
            await redis.resetTimeRedis(shortenText)
            return res.status(200).send(catchingShortUrl);
        }
        // get id from shortenText
        const id = await service.getIdFromShortUrl(shortenText)
        console.log("id:", id)
        // find id
        const findData = await ShortenUrl.findOne({
            _id: id,
        })
        console.log("findData:", findData)
        // if exsits, return short url
        if (!findData) {
            return res.status(400).send("wrong short url");
        }
        // set catching
        await redis.setRedis(shortenText, findData.longUrl)
        return res.send(shortenText)
    } catch(err) {
        console.log(err)
        return res.status(500).send(err);
    }
};

module.exports = getFullUrl