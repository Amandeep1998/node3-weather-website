const request = require('request');

const geocode = (address, callback) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW1hbmRlZXAwOCIsImEiOiJja2FjZ3U1ZDMwenZ6MnpydTZid2V6Nm4wIn0.gH9hii-zdZ3KWsKCdLtzOQ&limit=1`
   
    request({url: geocodeUrl, json: true}, (error, response) => {
       if(error) {
           callback('Unable to connect to the weather services', undefined);
       } else if(response.body.features.length === 0) {
           callback('Unable to find the location, Try Another', undefined);
       } else {
           callback(undefined, {
               latitude: response.body.features[0].center[1],
               longitude: response.body.features[0].center[0],
               location: response.body.features[0].place_name
           })
       }
    });
}




// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW1hbmRlZXAwOCIsImEiOiJja2FjZ3U1ZDMwenZ6MnpydTZid2V6Nm4wIn0.gH9hii-zdZ3KWsKCdLtzOQ&limit=1'

// request({url: geocodeUrl, json: true}, (error, response) => {
//     if(error) {
//         console.log('Unable to connect to the location services');
//     } else if(response.body.features.length === 0) {
//         console.log('Unable to find the location. Try another Search');
//     } else {
//         const latitude = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0];
    
//         console.log(latitude, longitude);
//     }
    
// });



module.exports = geocode;