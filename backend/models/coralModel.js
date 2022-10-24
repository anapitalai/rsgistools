import mongoose from  'mongoose';
import geocoder from '../utils/geocoder.js';

const coordSchema = mongoose.Schema({
  type:Number
})

const CoralSchema = mongoose.Schema({
  coralId: {
    type: String
  },
  coralArea:{
    type:String
  },
  parcel:{
    type:{
      type:String,
      enum:['Polygon']
    },
    coordinates: {
      type: Array,
      index:'2dpshere'
    }

  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Coral = mongoose.model('Coral', CoralSchema)

export default Coral
