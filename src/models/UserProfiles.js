import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  rating: { type: Number, default: 0 },
  preferred_music: { type: [String] }, // Bisa menambahkan banyak preferensi musik
  social_media: {
    twitter: { type: String },
    facebook: { type: String },
  },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
