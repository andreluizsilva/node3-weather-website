const request = require('request')


const forecast = ( latitude, longitude  , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=069bf457f0bd91a78b92807abba49257&query='+ latitude + ','+ longitude +'&units=m'

    request({ url, json: true }, (error, {body}) => {  
            if(error)  {
                callback('Unable to connect to weather service!', undefined)
            }else if(body.error){
                callback(body.error.info, undefined)
            }
            else{
               callback(undefined , body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. Its feel likes '+ body.current.feelslike + ' degrees.' )
            }    
        })
}

module.exports = forecast