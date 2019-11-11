const request = require('request');

const geocode = (address, callback) => {
    // const geocodingLosAngeles = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWloYWlzdGFuIiwiYSI6ImNrMm9wN2VxbzA3NTAzbW8yYnhqeG16Y3EifQ.R-ZPotH5o6e9SjZflQAHwQ";
    // const geocodeBucharest = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Bucharest.json?access_token=pk.eyJ1IjoibWloYWlzdGFuIiwiYSI6ImNrMm9wN2VxbzA3NTAzbW8yYnhqeG16Y3EifQ.R-ZPotH5o6e9SjZflQAHwQ&limit=3';
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWloYWlzdGFuIiwiYSI6ImNrMm9wN2VxbzA3NTAzbW8yYnhqeG16Y3EifQ.R-ZPotH5o6e9SjZflQAHwQ&limit=3';

    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to Geocoding service!', undefined)
        } else if(response.body.features.length === 0 ) {
            callback('Unable to find City!', undefined)
        } else {
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;

            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode;