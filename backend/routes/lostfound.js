const router = require('express').Router();
const LostFound = require('../models/LostFound');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// GET /api/lostfound — all items
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const items = await LostFound.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/lostfound — post new item + trigger AI match
router.post('/', async (req, res) => {
  try {
    const item = await LostFound.create(req.body);

    // Look for potential match in opposite type
    const oppositeType = item.type === 'lost' ? 'found' : 'lost';
    const candidates = await LostFound.find({ type: oppositeType, status: 'open' });

    if (candidates.length === 0) return res.json({ item, match: null });

    // Ask Claude to find the best match
    const candidateList = candidates.map((c, i) =>
      `[${i}] ID:${c._id} | "${c.name}" | ${c.description} | Location: ${c.location}`
    ).join('\n');

    const prompt = `
New ${item.type} item posted:
Name: "${item.name}"
Description: ${item.description}
Location: ${item.location}

Existing ${oppositeType} items:
${candidateList}

Reply ONLY with JSON: { "bestMatchIndex": <number or -1 if no match>, "score": <0-100>, "reason": "<one sentence why>" }
Match only if genuinely similar (same item type, color, or identifying detail). Score above 70 = good match.
`;

    const aiResponse = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }]
    });

    let match = null;
    try {
      const parsed = JSON.parse(aiResponse.content[0].text);
      if (parsed.bestMatchIndex >= 0 && parsed.score >= 70) {
        const matchedItem = candidates[parsed.bestMatchIndex];
        // Update both items
        await LostFound.findByIdAndUpdate(item._id, {
          matchId: matchedItem._id, matchScore: parsed.score, status: 'matched'
        });
        await LostFound.findByIdAndUpdate(matchedItem._id, {
          matchId: item._id, matchScore: parsed.score, status: 'matched'
        });
        match = { item: matchedItem, score: parsed.score, reason: parsed.reason };
      }
    } catch (e) { /* AI response wasn't valid JSON — no match */ }

    res.json({ item, match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/lostfound/:id/resolve
router.patch('/:id/resolve', async (req, res) => {
  try {
    const item = await LostFound.findByIdAndUpdate(
      req.params.id, { status: 'resolved' }, { new: true }
    );
    if (item.matchId) {
      await LostFound.findByIdAndUpdate(item.matchId, { status: 'resolved' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;