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



const Store = mongoose.model('Store', StoreSchema)

export default Store
