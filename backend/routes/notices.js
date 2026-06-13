const router = require('express').Router();
const Notice = require('../models/Notice');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// GET /api/notices — all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/notices — add notice (admin)
router.post('/', async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/notices/summarize — AI summarize a notice
router.post('/summarize', async (req, res) => {
  try {
    const { noticeText, noticeId } = req.body;
    if (!noticeText) return res.status(400).json({ error: 'noticeText required' });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 120,
      messages: [{
        role: 'user',
        content: `Summarize this college notice in exactly 2 short lines. Be direct, include key dates/deadlines/actions. No preamble.\n\nNotice:\n${noticeText}`
      }]
    });

    const summary = message.content[0].text;

    // Save summary back to DB if noticeId provided
    if (noticeId) {
      await Notice.findByIdAndUpdate(noticeId, { aiSummary: summary });
    }

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;