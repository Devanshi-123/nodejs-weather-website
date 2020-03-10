const request = require('request')
const geocode = (address,callback) =>{
    const url1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiMTgwOTU0IiwiYSI6ImNrNWIxeTM1YjE1dHYzZG82Z3dkaXRwM2gifQ.b6vXC_SpVYBFXUFzg59wGg&limit=1"
    request({url: url1, json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect",undefined)
        }
        else if(body.features.length === 0){
            callback("This location not available try another one",undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode