const request = require ('request')
const forecast = (latitude,longitude,callback)=>{
    const url = "https://api.darksky.net/forecast/60a983f6ba0697c415c875aaa50e6075/"+ encodeURIComponent(latitude) +","+  encodeURIComponent(longitude)+'?units=si'
    request({url,json:true},(error,{body})=>{
        if (error) {
            callback("Unable to connect to weather api",undefined)
        }
        else if(body.error){
             callback("Unable to fetch info",undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + "It is currently" +body.currently.temperature +".There is a " +body.currently.precipProbability+ "% chance of rain")
        }
    })
}
module.exports = forecast