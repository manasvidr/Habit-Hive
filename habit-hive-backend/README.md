# Habit Hive - Backend

1. copy `.env.example` → `.env` and fill values (MONGO_URI, JWT_SECRET, GOOGLE_API_KEY if you want AI)
2. install deps:
3. start dev:
or

API endpoints (all under `/api`):
- `POST /api/auth/register` {name,email,password} → {token,user}
- `POST /api/auth/login` {email,password} → {token,user}
- `GET /api/users/me` (auth) → user profile
- `PUT /api/users/me` (auth) {name,bio}
- `POST /api/users/me/avatar` (auth, multipart form-data `avatar`)
- `GET /api/habits` (auth)
- `POST /api/habits` (auth) {title,goal,unit,description}
- `PUT /api/habits/:id` (auth) update habit
- `DELETE /api/habits/:id` (auth)
- `POST /api/habits/:id/increment` (auth) {amount}
- `POST /api/habits/:id/decrement` (auth) {amount}
- `GET /api/habits/:id/weekly` (auth)
- `GET /api/habits/analytics/overview` (auth)
- `POST /api/ai/chat` (auth) {message}

Notes:
- Avatar uploads are served from `/uploads/<filename>` — by default stored on server disk (dev).
- For AI coach, configure `GOOGLE_API_KEY` and `GOOGLE_AI_ENDPOINT` in .env. The `/api/ai/chat` route forwards your message (adjust payload to match provider API).
