import mongoose from  'mongoose';
import geocoder from '../utils/geocoder.js';


//new Schema({ loc: { type: [Number], index: '2dsphere'}})
//geoschema
const GeometrySchema = mongoose.Schema({
  type: {
    type: String,
    default:'Point',
  },
  coordinates: {
    type: [Number],
    index:'2dpshere'
  }
});


// {
//   "type":"FeatureCollection",
//    "features":[{
//       "type":"Feature",
//       "properties":{},
//       "geometry":{
//          "type":"Multipolygon",
//           "coordinates":[[lg,lat],[lg2,lat2],[lg3,lon3]]
//    }  
// }]
// }

// {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "coordinates": [
//           [
//             [
//               147.08533466522567,
//               -6.727650545597541
//             ],
//             [
//               147.08533466522567,
//               -6.852940100899943
//             ],
//             [
//               147.42412055895534,
//               -6.852940100899943
//             ],
//             [
//               147.42412055895534,
//               -6.727650545597541
//             ],
//             [
//               147.08533466522567,
//               -6.727650545597541
//             ]
//           ]
//         ],
//         "type": "Polygon"
//       }
//     }
//   ]
// }


// const polygonSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Polygon'],
//     required: true
//   },
//   coordinates: {
//     type: [[[Number]]], // Array of arrays of arrays of numbers
//     required: true
//   }
// });

// const citySchema = new mongoose.Schema({
//   name: String,
//   location: polygonSchema
// });

const StoreGeojsonSchema = mongoose.Schema({
  coralId: {
    type: String
  },
  coralArea:{
    type:String
  },
  feature:{
    type:[String],
    default:Feature
  },
  coordinates: {
    type: [Number],
    index:'2dpshere'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


const StoreGeojson = mongoose.model('StoreGeojson', StoreGeojsonSchema)

export default StoreGeojson
