const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e8111db285c9ffe18e216e987e80a23b&query=${latitude},${longitude}&units=f`;

    request({url, json: true}, (error, response) => {

        if(error) {
            callback('Unable to connect to weather services', undefined);
        } else if(response.body.error) {
            callback('Unable to find the location', undefined);
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]} It is currently ${response.body.current.temperature} out. It feels like ${response.body.current.feelslike} out`);
        }
    });
}

module.exports = forecast;


// const url = 'http://api.weatherstack.com/current?access_key=e8111db285c9ffe18e216e987e80a23b&query=19.0330,73.0297&units=f';

// request({ url: url, json: true}, (error, response) => {
//     if(error) {
//         console.log('Unable to connect to the Weather Services');
//     } else if(response.body.error) {
//         console.log('Unable to find the location');
//     }    
//     else{
//     console.log(`${response.body.current.weather_descriptions[0]} It is currently ${response.body.current.temperature} out. It feels like ${response.body.current.feelslike} out`);
//     }
// });

