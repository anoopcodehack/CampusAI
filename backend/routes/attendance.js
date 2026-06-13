// routes/attendance.js
const router = require('express').Router();
const Student = require('../models/Student');

// GET /api/attendance/:rollNo
router.get('/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo }, 'attendance name rollNo');
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/attendance/:rollNo — update attendance for a subject
router.patch('/:rollNo', async (req, res) => {
  try {
    const { subject, attended, total, remaining } = req.body;
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) return res.status(404).json({ error: 'Not found' });

    const idx = student.attendance.findIndex(a => a.subject === subject);
    if (idx >= 0) {
      student.attendance[idx] = { subject, attended, total, remaining };
    } else {
      student.attendance.push({ subject, attended, total, remaining });
    }
    await student.save();
    res.json({ success: true, attendance: student.attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;