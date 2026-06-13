const router = require('express').Router();
const Student = require('../models/Student');

// POST /api/student/login
router.post('/login', async (req, res) => {
  try {
    const { rollNo, password } = req.body;
    const student = await Student.findOne({ rollNo });
    if (!student)           return res.status(404).json({ error: 'Student not found' });
    if (student.password !== password) return res.status(401).json({ error: 'Wrong password' });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/student/:rollNo  — full dashboard data
router.get('/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;