# 🚀 CampusAI — Your College's Own AI Assistant

"Ask anything about your college — exams, fees, hostel rules, clubs, faculty — and get instant answers."
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

# Backend
## Setup in 5 minutes

### 1. Install dependencies
```
npm install
```

### 2. Create .env file
```
cp .env.example .env
```
Fill in:
- MONGO_URI → get free DB at mongodb.com/atlas
- ANTHROPIC_API_KEY → your Claude API key

### 3. Start server
```
node server.js
```

### 4. Seed demo data (run once)
Open browser: http://localhost:5000/api/seed

### 5. Test
- http://localhost:5000/                          → health check
- http://localhost:5000/api/student/4SF23CS021    → student data
- http://localhost:5000/api/notices               → all notices
- http://localhost:5000/api/exams                 → exam list

## API Endpoints

| Method | Route                        | What it does              |
|--------|------------------------------|---------------------------|
| POST   | /api/student/login           | Login with rollNo+password|
| GET    | /api/student/:rollNo         | Full student dashboard data|
| GET    | /api/notices                 | All notices               |
| POST   | /api/notices/summarize       | AI summarize a notice     |
| POST   | /api/chat                    | Ask CampusAI (real Claude)|
| GET    | /api/lostfound               | All lost & found items    |
| POST   | /api/lostfound               | Post item + AI matching   |
| GET    | /api/attendance/:rollNo      | Attendance data           |
| GET    | /api/exams                   | Upcoming exams            |
| GET    | /api/seed                    | Seed demo data            |

## Connect to frontend
See frontend-connect.js — paste functions into your HTML pages.
