import mongoose from 'mongoose';
const VehicleInfoSchema = new mongoose.Schema({
    vehicleId: { type: String, required: true, unique: true },
    ownerId: { type: String, required: true },
    type: { type: String, enum: ["motor", "mobil", "EV"], required: true },
    capacity: { type: Number, required: true },
    ev_charging_type: { type: String }, // Hanya untuk kendaraan listrik
  });
  
  module.exports = mongoose.model("VehicleInfo", VehicleInfoSchema);
  