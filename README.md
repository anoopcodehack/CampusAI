# CampusAI 🤖
### Your College's Own AI Assistant

💡"Ask anything about your college — exams, fees, hostel rules, clubs, faculty — and get instant answers."
"Every college has information scattered across WhatsApp groups, notice boards, and faculty emails. CampusAI brings it all together — one AI assistant that answers any student question instantly. No searching, no waiting, just ask."

Think ChatGPT but trained on your college's data.
What it does:

Student types "When is the last date to pay fees?" → AI answers instantly
"Which professor handles CN lab?" → instant answer
"What are the hostel rules?" → instant answer

<img width="1890" height="876" alt="image" src="https://github.com/user-attachments/assets/34892c3b-cde8-42ed-a60c-3caf45437380" />

<img width="1697" height="875" alt="image" src="https://github.com/user-attachments/assets/ee0291c0-f20d-47e7-a8f8-78a8f5c6822d" />

<img width="1882" height="847" alt="image" src="https://github.com/user-attachments/assets/f2f41c58-61b3-4501-b2ad-1a4caeddd1e1" />

<img width="1595" height="776" alt="image" src="https://github.com/user-attachments/assets/b045f216-06c1-45fb-b05c-af38270c352b" />

---

## ✨ Features

### 🤖 Core AI Features
| Feature | Description |
|---------|-------------|
| **AI Campus Assistant** | Ask anything in plain English — fees, exams, hostel rules, faculty. Powered by Claude AI. |
| **AI Notice Summarizer** | Every circular auto-summarized to 2 lines. Never miss critical info buried in pages of formal text. |
| **AI Lost & Found Matcher** | Post lost/found items → AI matches them by color, brand, location, and description. |
| **AI Attendance Risk Predictor** | Tells you exactly how many classes you can skip or must attend to stay above 75%. |
| **AI Study Group Finder** | Announce what you're studying → AI finds batchmates studying the same thing → instant WhatsApp group. |

### 📊 Dashboard & Academic
| Feature | Description |
|---------|-------------|
| **Live Dashboard** | Attendance %, pending fees, upcoming exams — all personalized on one screen. |
| **Exam Tracker** | Countdown timers, AI prep tips, topic weights, hall ticket download. |
| **Smart Timetable** | Weekly schedule with AI-detected free slots and exam conflict warnings. |
| **Attendance Risk Analyser** | Per-subject risk with What-If simulator to plan your week. |

### 🏫 Campus Features
| Feature | Description |
|---------|-------------|
| **Notice Board** | All college circulars with AI 2-line summaries and urgent banners. |
| **Faculty Directory** | Find any faculty — cabin, hours, email, subjects. AI-powered search. |
| **Interactive Campus Map** | Clickable SVG campus map with AI building tips and directions. |
| **Fee Management** | View dues, payment history, pay online, download receipts. |
| **Study Group Finder** | Live sessions, upcoming groups, AI matching, WhatsApp integration. |

---

## 🗂️ Project Structure

```
CampusAI/
│
├── frontend/                   # All HTML pages
│   ├── index.html              # Landing page
│   ├── login.html              # Student / Faculty / Admin login
│   ├── dashboard.html          # Main student dashboard
│   ├── chat.html               # AI Campus Assistant (Claude API)
│   ├── noticeboard.html        # Notices with AI summaries
│   ├── attendance.html         # Attendance Risk Predictor
│   ├── examtracker.html        # Exam Tracker + AI prep plans
│   ├── timetable.html          # Weekly timetable + AI free slots
│   ├── lostfound.html          # Lost & Found AI Matcher
│   ├── faculty.html            # Faculty Directory + AI search
│   ├── campusmap.html          # Interactive Campus Map
│   ├── fees.html               # Fee Management Portal
│   └── studygroups.html        # AI Study Group Finder
│
└── backend/                    # Node.js + Express API
    ├── server.js               # Main server entry point
    ├── seed.js                 # Demo data seeder
    ├── .env                    # Environment variables
    ├── package.json
    │
    ├── models/                 # MongoDB Schemas
    │   ├── Student.js          # Student data, attendance, fees
    │   ├── Notice.js           # College notices + AI summaries
    │   └── LostFound.js        # Lost & found items + match data
    │
    └── routes/                 # API Endpoints
        ├── student.js          # Login + dashboard data
        ├── chat.js             # Claude AI chat endpoint
        ├── notices.js          # Notices + AI summarizer
        ├── lostfound.js        # Lost & found + AI matcher
        ├── attendance.js       # Attendance CRUD
        └── exams.js            # Upcoming exams
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free)
- Anthropic API key

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Fill in MONGO_URI and ANTHROPIC_API_KEY

# 4. Start server
node server.js

# 5. Seed demo data (run once)
# Open in browser: http://localhost:5000/api/seed
```

### Frontend Setup

No build step needed. Just open any HTML file in a browser or use Live Server in VS Code.

```bash
# With VS Code Live Server — right-click index.html → Open with Live Server
# Or simply double-click index.html
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/student/login` | Login with roll number + password |
| `GET` | `/api/student/:rollNo` | Full student dashboard data |
| `GET` | `/api/notices` | All college notices |
| `POST` | `/api/notices/summarize` | AI summarize a notice (Claude) |
| `POST` | `/api/chat` | Ask CampusAI — real Claude AI |
| `GET` | `/api/lostfound` | All lost & found items |
| `POST` | `/api/lostfound` | Post item + trigger AI matching |
| `GET` | `/api/attendance/:rollNo` | Student attendance data |
| `GET` | `/api/exams` | Upcoming exam schedule |
| `GET` | `/api/seed` | Seed database with demo data |

---

## 🛠️ Tech Stack

### Frontend
- Pure HTML5, CSS3, Vanilla JavaScript
- Google Fonts — Nunito (900 weight brutalist design system)
- No frameworks, no dependencies — zero build step

### Backend
- **Node.js** + **Express.js** — REST API
- **MongoDB Atlas** — Cloud database (free tier)
- **Mongoose** — ODM for MongoDB
- **Anthropic Claude API** — AI features (chat, summarizer, matcher)
- **dotenv** — Environment config
- **cors** — Cross-origin requests

---

## 🤖 AI Integration

CampusAI uses **Claude Sonnet** (claude-sonnet-4-6) for three real AI features:

### 1. Campus Chat Assistant
```javascript
// routes/chat.js
POST /api/chat
{ question: "When is the fee deadline?" }
→ { answer: "Fee payment deadline is June 20, 2026..." }
```

### 2. Notice Summarizer
```javascript
// routes/notices.js
POST /api/notices/summarize
{ noticeText: "...long circular..." }
→ { summary: "Pay fees by June 20. Late fee ₹500/week." }
```

### 3. Lost & Found Matcher
```javascript
// routes/lostfound.js
POST /api/lostfound
{ type: "lost", name: "Blue Nike Backpack", description: "..." }
→ { item: {...}, match: { score: 91, reason: "Color + brand + keychain match" } }
```

---

## 🎨 Design System

- **Primary Font:** Nunito 900 (brutalist editorial style)
- **Colors:** `#111111` black · `#e5473b` red · `#c8f000` lime · `#f9f9f7` off-white
- **Style:** Brutalist editorial — thick 2px borders, no border-radius, high contrast
- **Inspired by:** GoldenShuttle design system

---

## 📸 Pages Overview

| Page | What Judges See |
|------|----------------|
| `index.html` | Hero landing with live mockup preview |
| `login.html` | Split-screen login with role selector |
| `dashboard.html` | Personalized student dashboard |
| `chat.html` | Real AI chat — type any question, get instant answer |
| `noticeboard.html` | Notices with AI 2-line summaries |
| `attendance.html` | Risk predictor + what-if simulator |
| `examtracker.html` | Exam countdown + topic checklist + AI tips |
| `timetable.html` | Color-coded weekly grid + AI free slot detection |
| `lostfound.html` | AI match alert with 91% confidence score |
| `faculty.html` | Searchable faculty directory + availability status |
| `campusmap.html` | Interactive SVG campus map |
| `fees.html` | Fee dues + payment modal + history |
| `studygroups.html` | Live study sessions + AI group matching |

---

## 🏅 What Makes CampusAI Different

1. **Real AI** — Not fake responses. Actual Claude API integration for chat, summaries, and matching.
2. **Unique features** — Lost & Found AI matching and Attendance Risk Predictor exist nowhere else.
3. **Design quality** — Judges can tell the difference between a template and a crafted product.
4. **Student-first** — Every feature solves a real pain that every CSE student feels daily.
5. **Complete product** — 13 pages, real backend, real database, real AI. Not just a landing page.

---

## 📄 License

MIT License — Open Source · Built for WebForge 2026

