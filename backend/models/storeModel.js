import mongoose from  'mongoose';
import geocoder from '../utils/geocoder.js';


const StoreSchema = mongoose.Schema({
  storeId: {
    type: String,
    required: [true, 'Please add a store ID'],
    unique: true,
    trim: true,
    maxlength: [10, 'Store ID must be less than 10 chars']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});



// // Geocode & create location
// StoreSchema.pre('save', async function(next) {
//   const loc = await geocoder.geocode(this.address);
//   this.location = {
//     type: 'Point',
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress
//   };

//   // Do not save address
//   this.address = undefined;
//   next();
// });


const Store = mongoose.model('Store', StoreSchema)

export default Store
