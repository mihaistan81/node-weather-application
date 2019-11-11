const request = require('request');

const forecast = ( latitude, longitude, callback) => {

    //const url = 'https://api.darksky.net/forecast/e55152ffd03a00c13bda0ee3f5d2ef21/37.8267,-122.4233?lang=ro&units=si';
    const url = 'https://api.darksky.net/forecast/e55152ffd03a00c13bda0ee3f5d2ef21/'+ latitude +','+ longitude +'?lang=ro&units=si';

    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(response.body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const {temperature, precipProbability} = response.body.currently
            const {temperatureHigh, temperatureLow} = response.body.daily.data[0]

            callback(undefined, response.body.daily.data[0].summary + 
                " It it currently "+ temperature + " degrees out. There is a "+ precipProbability +"% chance of rain." + " "+
                " The High Temperature is: "+ temperatureHigh + " and the Low Temperature is "+ temperatureLow
            )
        }    
    });
}
module.exports = forecast;