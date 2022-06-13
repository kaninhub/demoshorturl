const express = require('express')
const router = express.Router()
const getFullUrl = require('../controllers/get-full-url');
const generateShortenUrl = require('../controllers/generate-shorten-url');

router.post('/shorten', generateShortenUrl)
router.get('/:shortenText', getFullUrl)

module.exports = router