Habit Hive

A MERN Habit Tracking Web App

Habit Hive helps you build consistency using a clean dashboard, progress tracking, and a cute modern UI. Stay on track with your goals — one pastel habit card at a time.

Features

Authentication
• Register and login
• JWT-secured sessions
• Auto-persisted user state

Dashboard
• View all habits
• Increment / decrement progress
• Pastel progress bars
• Delete habits
• Updated date tracking
• Clean grid layout

Add Habit
• Add habits with title, goal, unit
• Pastel aesthetic UI
• Smooth validation

Analytics
• View statistics
• Individual habit graphs
• Combined progress charts

Profile
• View user info
• Upload/change profile avatar

UI
• Soft pastel gradients
• Pink bee mascot
• Responsive layout

📁 Project Structure

Habit-Hive/
├── habit-hive/ (Frontend)
│ ├── src/pages/
│ ├── src/components/
│ ├── src/context/
│ ├── src/api/
│ └── App.jsx
│
└── habit-hive-backend/ (Backend)
├── routes/
├── models/
├── server.js
├── .env
└── package.json

Setup Guide
1️⃣ Clone the Repository

git clone https://github.com/manasvidr/Habit-Hive.git

cd Habit-Hive

2️⃣ Backend Setup

cd habit-hive-backend
npm install

Create .env inside backend:
PORT=4000
MONGO_URI=mongodb://localhost:27017/habit_hive
JWT_SECRET=your_jwt_secret_here
FRONTEND_ORIGIN=http://localhost:5173

Start backend:
npm run dev

Backend URL:
http://localhost:4000

3️⃣ Frontend Setup

cd ../habit-hive
npm install
npm run dev

Frontend URL:
http://localhost:5173

Usage

Add Habit → Fill name, goal, unit
Track progress → Use + / – buttons
Delete habit → Click trash icon
View profile → Check user info

💻 Tech Stack

Frontend: React, Vite, Axios, React Router, Lucide Icons
Backend: Node.js, Express, MongoDB (Mongoose), JWT, CORS

Deployment

Frontend (Vercel/Netlify):
npm run build → upload dist/

Backend (Render/Heroku):
Push backend folder → add env vars

Environment Variables

Frontend:
VITE_API_BASE_URL=http://localhost:4000

Backend:
PORT=
MONGO_URI=
JWT_SECRET=
FRONTEND_ORIGIN=
