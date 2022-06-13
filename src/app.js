const bodyParser = require('body-parser')
const express = require('express')
const config = require('./config/config')
const router = require('./routes/route')
const app = express()
const mongoose = require('mongoose')
const service = require('./services/service')
const redis = require('./utils/redis')
app.use(bodyParser.json())
app.use(router)

const urlDb = `mongodb://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}`
console.log("urlDb:", urlDb)

app.listen(config.PORT, async () => {
    console.log('server running on port: ', config.PORT)
    mongoose.connect(urlDb, { useNewUrlParser: true });
    global.LASTIDWHENSTARTSERVER = await service.getLastIDShortenUrl()
    console.log("LASTIDWHENSTARTSERVER:", LASTIDWHENSTARTSERVER)
    await redis.connectRedis()
})
