import mongoose from 'mongoose';
const RouteHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    pickup: { lat: Number, lng: Number },
    stops: [{ lat: Number, lng: Number }],
  });
  
  module.exports = mongoose.model("RouteHistory", RouteHistorySchema);
  