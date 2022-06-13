const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortenUrlSchema = new Schema({
  _id: Number,
  shortUrl: String,
  longUrl: String,
}, {
  timestamps: { createdAt: true, updatedAt: false }
})

const ShortenUrlModel = mongoose.model('ShortenUrl', shortenUrlSchema)
module.exports = ShortenUrlModel
