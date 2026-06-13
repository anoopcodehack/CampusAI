const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  type:       { type: String, enum: ['lost','found'], required: true },
  name:       { type: String, required: true },
  description:{ type: String, required: true },
  location:   { type: String, required: true },
  category:   { type: String, default: 'Other' },
  poster:     { type: String, required: true },
  rollNo:     { type: String, required: true },
  matchId:    { type: mongoose.Schema.Types.ObjectId, ref: 'LostFound', default: null },
  matchScore: { type: Number, default: null },
  status:     { type: String, enum: ['open','matched','resolved'], default: 'open' },
  date:       { type: Date, default: Date.now },
});

module.exports = mongoose.model('LostFound', lostFoundSchema);