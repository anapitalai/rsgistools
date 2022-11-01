import mongoose from  'mongoose';
import geocoder from '../utils/geocoder.js';
import asyncHandler from 'express-async-handler';



const geometrySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: false
  },
  coordinates: {
    type: [[[Number]]],
    index:'2dsphere',
    required: false
  }
});

const propertiesSchema=new mongoose.Schema({
  type:String,
  coralId: {
    type: String,
    required:false
  },
  coralArea:{
    type:String
  }
})

const featureObjectSchema=new mongoose.Schema({
  
  type:{
    type:String,
    enum:['Feature'],
    default:'Feature'
  },
  properties:{type:propertiesSchema},
  geometry:{type:geometrySchema}
})

const CoralSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  type:{
    type:String,
    enum:['FeatureCollection'],
    default:'FeatureCollection'
  },
  features:{
     //type:[featureObjectSchema]
     type:{}
  }

});


const  Coral = mongoose.model('Coral', CoralSchema);


export default Coral
