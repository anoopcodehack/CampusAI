# CampusAI Backend 🚀

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