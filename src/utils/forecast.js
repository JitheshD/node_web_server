const request = require("request")

const forecast = (latitude, longitude, callback) =>{
    const url = "https://api.darksky.net/forecast/6ae297e6f31553e0c8f55516eda822d7/"+latitude+","+longitude+""

    request({url: url, json: true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast