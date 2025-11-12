# Habit Hive

Habit Hive is a MERN-stack habit tracking web app that helps you stay consistent and track your daily goals.

---

## Features
- User login and registration  
- Dashboard to add, edit, and track habits  
- Progress bar and confetti when you complete goals  
- Analytics with weekly graphs  
- AI Coach powered by OpenAI  
- Profile page showing user info  

---

## Setup Guide

1. Clone the repository  
   git clone https://github.com/manasvidr/Habit-Hive.git  
   cd Habit-Hive

2. Set up the backend  
   cd habit-hive-backend  
   npm install  

   Create a file named .env inside the backend folder and add:  
   PORT=4000  
   MONGO_URI=mongodb://localhost:27017/habit_hive  
   JWT_SECRET=your_jwt_secret_here  
   OPENAI_API_KEY=sk-yourkeyhere  

   Start the backend:  
   npm run dev  

3. Set up the frontend  
   cd ../habit-hive  
   npm install  
   npm run dev  

4. Open the app in your browser at  
   http://localhost:5173  

---
