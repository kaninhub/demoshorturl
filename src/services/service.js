const ShortenUrl = require('../models/shorten-url')

const BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const getLastIDShortenUrl = async () => {
    const data = await ShortenUrl.findOne({}, {}, { sort: { 'createdAt' : -1 } })
    if (!data) {
        return 0
    }
    return data._id
}

const generateShortenUrl = async (longUrl) => {
    
    // generate shorten url
    // newId is lastest _id + 1
    const newId = LASTIDWHENSTARTSERVER + 1
    let shorturl = [];
    
    // Convert given integer id to a base 62 number
    let tempNewId = newId
    while (tempNewId)
    {
        // use above map to store actual character
        // in short url
        shorturl.push(BASE62[tempNewId % 62]);
        tempNewId = Math.floor(tempNewId / 62);
    }
    // Reverse shortURL to complete base conversion
    shorturl.reverse();
    shortUrlString = shorturl.join("")

    await ShortenUrl.create({
        _id: newId,
        shortUrl: shortUrlString,
        longUrl: longUrl,
    })
    LASTIDWHENSTARTSERVER++
    return shortUrlString
}

const getIdFromShortUrl = async (shortURL) => {
    let id = 0
    for (let i = 0; i < shortURL.length; i++) {
        if ('a' <= shortURL[i] && shortURL[i] <= 'z')
            id = id * 62 + shortURL[i].charCodeAt(0) - 'a'.charCodeAt(0);
        if ('A' <= shortURL[i] && shortURL[i] <= 'Z')
            id = id * 62 + shortURL[i].charCodeAt(0) - 'A'.charCodeAt(0) + 26;
        if ('0' <= shortURL[i] && shortURL[i] <= '9')
            id = id * 62 + shortURL[i].charCodeAt(0) - '0'.charCodeAt(0) + 52;
    }
    return id;
}

module.exports = {
    getLastIDShortenUrl,
    generateShortenUrl,
    getIdFromShortUrl
};