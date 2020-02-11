const request = require("request")

geocode = (address, callback) => {
    geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURI(address)+".json?access_token=pk.eyJ1Ijoiaml0aGVzaGoiLCJhIjoiY2s2NjA1ZG81MWJ4eTNubW0xZzhiOWdxbCJ9.NQUj25cDWnZoRxxkE99YJQ"
    request({url:geocodeURL, json: true}, (error, {body}) => {
        if(error){
            console.log("connection error", undefined)
        }
        // else if(response.body.features.length === 0){
           else if(body.message){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode