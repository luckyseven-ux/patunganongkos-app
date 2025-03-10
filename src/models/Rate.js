import mongoose from 'mongoose';


const RatingSchema = new mongoose.Schema({
    driverId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    tags: { type: [String] }, // Contoh: ["tepat waktu", "mobil bersih"]
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Rating", RatingSchema);
  