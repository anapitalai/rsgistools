import NodeGeocoder from 'node-geocoder'

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'A479YIZcw8fHgQVPyaaRwhISxOlHvKIM',
  formatter: null
};

const geocoder = NodeGeocoder(options);

export default geocoder
