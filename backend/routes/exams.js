const router = require('express').Router();

// Static exam data — replace with DB in production
const EXAMS = [
  { id:1, subject:'CN Lab Practical',  code:'CN',   date:'2026-06-14', time:'10:00 AM', hall:'Lab Block 3', type:'Practical', daysLeft:1  },
  { id:2, subject:'Microprocessors',   code:'MES',  date:'2026-06-18', time:'9:00 AM',  hall:'Hall A',      type:'Theory',    daysLeft:5  },
  { id:3, subject:'DAA',               code:'DAA',  date:'2026-06-21', time:'9:00 AM',  hall:'Hall B',      type:'Theory',    daysLeft:8  },
  { id:4, subject:'DBMS',              code:'DBMS', date:'2026-06-24', time:'9:00 AM',  hall:'Hall A',      type:'Theory',    daysLeft:11 },
];

// GET /api/exams
router.get('/', (req, res) => res.json(EXAMS));

// GET /api/exams/next — most urgent
router.get('/next', (req, res) => res.json(EXAMS[0]));

module.exports = router;