const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'A479YIZcw8fHgQVPyaaRwhISxOlHvKIM',
  formatter: null
};

const geocoder = NodeGeocoder(options);



// Using callback
geocoder.geocode('29 champs elysée paris', function(err, res) {
  console.log(res);
});