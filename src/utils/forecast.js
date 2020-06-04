const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ccee132659748904695dd3419ea21f69&query=${latitude},${longitude}&units=f`;
    // console.log(url);

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const {
                weather_descriptions,
                weather_icons,
                temperature,
                feelslike
            } = body.current;

            const str = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`

            const data = {
                weather_message: str,
                weather_icons
            }

            callback(undefined, data);
        }
    })
};

module.exports = forecast;