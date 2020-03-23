const mongoose = require('mongoose');


// This is BASICALLy the exact format the device will given when asked for location related data.
const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
})


const trackSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name:{
    type: String,
    default: '',
  },
  locations: [pointSchema]
});


mongoose.model('Track', trackSchema);