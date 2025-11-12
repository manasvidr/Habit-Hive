// src/pages/Home.jsx
import React from "react";
import "../App.css";

export default function Home() {
  return (
    <div className="container">
      <header className="app-header">
        <div className="brand">
        <img src="/pinkbee.jpeg" alt="Habit Hive logo" className="logo-img" />
          <div>
            <h3 className="h1" style={{fontSize:32}}>Habit Hive</h3>
            <div className="muted">gentle habits, giant wins</div>
          </div>
        </div>

        <nav className="nav-links">
          <a href="/" className="active">Home</a>
          <a href="/about">About</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      <section className="card" style={{display:'flex',gap:20,alignItems:'center'}}>
        <div style={{flex:1}}>
          <h2 className="h2">Turn tiny actions into lasting routines</h2>
          <p style={{fontSize:18,color:'var(--muted)',lineHeight:1.6}}>
            Habit Hive helps you track what matters — from water intake and reading to quick study sessions.
            Add habits, tap progress through the day, and watch beautiful analytics that actually motivate.
            Built to be kind to your attention: pastel vibes, big text, and a coach that cheers you on.
          </p>

          <div style={{marginTop:18}}>
            <a href="/dashboard" className="btn">Go to Dashboard</a>
            <a href="/ai-coach" style={{marginLeft:12}} className="btn ghost">Ask AI Coach</a>
          </div>
        </div>

        <div style={{width:320}}>
          <div className="card" style={{padding:18, background:'linear-gradient(135deg, rgba(255,198,250,0.04), rgba(159,213,255,0.02))'}}>
            <h3 className="h2">Quick start</h3>
            <ol style={{color:'var(--muted)', lineHeight:1.8}}>
              <li>Add a habit: name, goal & unit.</li>
              <li>Tap + each time you do it; − for mistakes.</li>
              <li>Open Analytics to view weekly progress.</li>
            </ol>
            <p className="muted" style={{fontSize:13,marginTop:10}}>Pro tip: keep goals small at first — consistency > intensity.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
