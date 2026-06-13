// ============================================================
// HOW TO CONNECT FRONTEND → BACKEND
// Paste this in any HTML page's <script> tag
// ============================================================

const API = 'http://localhost:5000/api';

// ── 1. LOGIN ──────────────────────────────────────────────
async function login(rollNo, password) {
  const res = await fetch(`${API}/student/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rollNo, password })
  });
  const data = await res.json();
  if (data.success) {
    localStorage.setItem('student', JSON.stringify(data.student));
    window.location.href = 'dashboard.html';
  } else {
    alert('Login failed: ' + data.error);
  }
}

// ── 2. LOAD DASHBOARD DATA ────────────────────────────────
async function loadDashboard() {
  const student = JSON.parse(localStorage.getItem('student'));
  const res = await fetch(`${API}/student/${student.rollNo}`);
  const data = await res.json();

  // Fill attendance
  data.attendance.forEach(sub => {
    const pct = Math.round((sub.attended / sub.total) * 100);
    document.getElementById(`att-${sub.subject}`).textContent = pct + '%';
  });

  // Fill fees
  const pending = data.fees.filter(f => !f.paid).reduce((a, f) => a + f.amount, 0);
  document.getElementById('pending-fees').textContent = '₹' + pending;
}

// ── 3. ASK CAMPUSAI (real AI!) ────────────────────────────
let chatHistory = [];

async function askCampusAI(question) {
  const res = await fetch(`${API}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, history: chatHistory })
  });
  const data = await res.json();

  // Save to history for multi-turn
  chatHistory.push({ role: 'user',      content: question    });
  chatHistory.push({ role: 'assistant', content: data.answer });

  return data.answer;
}

// ── 4. LOAD NOTICES ──────────────────────────────────────
async function loadNotices() {
  const res = await fetch(`${API}/notices`);
  const notices = await res.json();
  const container = document.getElementById('notices-container');
  container.innerHTML = notices.map(n => `
    <div class="notice-card ${n.urgent ? 'urgent' : ''}">
      <div class="nc-title">${n.title}</div>
      <div class="ai-summary-text">${n.aiSummary || 'Loading AI summary...'}</div>
    </div>
  `).join('');
}

// ── 5. SUMMARIZE NOTICE WITH AI ──────────────────────────
async function summarizeNotice(noticeText, noticeId) {
  const res = await fetch(`${API}/notices/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ noticeText, noticeId })
  });
  const data = await res.json();
  return data.summary;
}

// ── 6. POST LOST/FOUND ITEM ──────────────────────────────
async function postLostFound(type, name, description, location) {
  const student = JSON.parse(localStorage.getItem('student'));
  const res = await fetch(`${API}/lostfound`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type, name, description, location,
      poster: student.name,
      rollNo: student.rollNo,
      category: 'Other'
    })
  });
  const data = await res.json();
  if (data.match) {
    alert(`✦ CampusAI found a match! ${data.match.score}% confidence — ${data.match.reason}`);
  }
  return data;
}

// ── 7. LOAD ATTENDANCE ───────────────────────────────────
async function loadAttendance(rollNo) {
  const res = await fetch(`${API}/attendance/${rollNo}`);
  return await res.json();
}