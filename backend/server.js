require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ── MIDDLEWARE ──
app.use(cors());
app.use(express.json());

// ── DB CONNECT ──
// ── DB CONNECT ──
// Ensure we have a valid URI string for mongoose.connect()
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/CampusAI';
if (!process.env.MONGO_URI) {
  console.warn('⚠️ MONGO_URI not set. Falling back to local MongoDB at', MONGO_URI);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.log('❌ MongoDB error:', err.message);
    process.exit(1);
  });
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.log('❌ MongoDB error:', err.message))

// ── ROUTES ──
app.use('/api/student',    require('./routes/student'));
app.use('/api/notices',    require('./routes/notices'));
app.use('/api/lostfound',  require('./routes/lostfound'));
app.use('/api/chat',       require('./routes/chat'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/exams',      require('./routes/exams'));

// ── SEED ROUTE (run once to fill DB) ──
app.get('/api/seed', require('./seed'));

// ── HEALTH CHECK ──
app.get('/', (req, res) => res.json({ status: 'CampusAI backend running 🚀' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));