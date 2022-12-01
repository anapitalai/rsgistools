import mongoose from 'mongoose'


const TemperatureSchema = mongoose.Schema(
   {
     location_name:{type:String},
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
    },
    date: {
      type: Date
    },
    temp_depth_3m: {
      type: Number,
     
    },
    temp_depth_5_5m: {
      type: Number,
     
    },
    temp_depth_9m: {
      type: Number,
     
    }
  
} 
)

const Temperature = mongoose.model('Temperature', TemperatureSchema)

export default Temperature
