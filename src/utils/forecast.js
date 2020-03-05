const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/52fb9279c1cf6b262aec22a1061651c0/' + latitude + ',' + longitude + '?lang=hu&units=si'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location-forecast', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + '\
       Jelenleg ' + body.currently.temperature + ' Celsius fok van. \
       Esély az esőre: ' + body.currently.precipProbability + '%.  \
       Ma várható maximum hőmérséklet: ' + body.daily.data[0].temperatureHigh + 'Celsius fok. \
       A várható minimum: ' + body.daily.data[0].temperatureLow + ' Celsius fok.')
    }
  })
}

module.exports = forecast
