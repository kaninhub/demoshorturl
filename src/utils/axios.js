const axios = require('axios');
const config = require('../config/config')

const connectAxios = async (method, url, body) => {
    res = ""
    try {
        const res = await axios({
            method: method,
            url: url,
            data: body || "",
        })
        return res
    } catch(err) {
        return res
    }
};


module.exports = {
    connectAxios,
}