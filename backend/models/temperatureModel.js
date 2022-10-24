import mongoose from 'mongoose'


const TemperatureSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    temperature: {
      type: Number,
      required: true,
    },

    reflectance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }

)

const Temperature = mongoose.model('Temperature', TemperatureSchema)

export default Temperature
