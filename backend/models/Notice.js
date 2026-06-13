const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  body:       { type: String, required: true },
  aiSummary:  { type: String, default: '' },
  tag:        { type: String, default: 'GENERAL' }, // URGENT, EXAM, FEES, HOSTEL, GENERAL
  urgent:     { type: Boolean, default: false },
  date:       { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notice', noticeSchema);