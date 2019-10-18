const request = require('request')

const api_token = 'UnWKQPMQtxr0pby8OejtkO1B6H90YjVXuvqYK0aPTRaQc3JkLEgcruGDtUDC'

const cotacao = (symbol, callback) => {

    const url = `https://www.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`

    request({ url: url, json: true }, (err, response) => {
        if (err) {
            callback({
                message: err,
                code : 500
            }, undefined);
        }

        if (response.body === undefined || response.body.data === undefined) {
            callback({
                message: 'No data found',
                code : 404
            }, undefined);
        }

        const parsedJSON = response.body.data[0];
        console.log(parsedJSON);
        const { symbol, name, currency, price_open, price, day_high, day_low } = parsedJSON

        const data = { symbol, name, currency, price_open, price, day_high, day_low }

        callback(undefined, data);
    })
}

module.exports = cotacao