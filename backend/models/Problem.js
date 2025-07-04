const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photoUrl: { type: String, required: true }, // path of uploaded photo
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  description: { type: String, trim: true }, // optional text description
  status: { type: String, enum: ['Pending', 'Processing', 'Solved'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);