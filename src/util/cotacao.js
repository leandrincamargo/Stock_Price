const request = require('request')

const api_token = '146d1476eeb03fa99a8ac03e45dd06e8'

const cotacao = (symbol, callback) => {
    const url = `http://api.marketstack.com/v1/tickers/${symbol}/eod?access_key=${api_token}`;

    request({ url: url, json: true }, (err, response) => {
        if (err) {
            callback({
                message: err,
                code : 500
            }, undefined);
        }
        else if (response.body === undefined || response.body.data === undefined) {
            callback({
                message: 'No data found',
                code : 404
            }, undefined);
        }
        else {
            const parsedSymbolJSON = response.body.data;
            const parsedEoDJSON = response.body.data.eod[0];
            const { symbol, name } = parsedSymbolJSON;
            const { exchange, open, close, high, low } = parsedEoDJSON;
    
            const data = { symbol, name, exchange, open, close, high, low }
            console.log(data);
            callback(undefined, data);
        }
    })
}

module.exports = cotacao