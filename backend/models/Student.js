const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo:     { type: String, required: true, unique: true },
  name:       { type: String, required: true },
  dept:       { type: String, default: 'CSE' },
  semester:   { type: Number, default: 4 },
  password:   { type: String, default: 'demo123' },
  attendance: [{
    subject:  String,
    attended: Number,
    total:    Number,
    remaining:Number
  }],
  fees: [{
    name:   String,
    amount: Number,
    due:    String,
    paid:   Boolean
  }],
});

module.exports = mongoose.model('Student', studentSchema);