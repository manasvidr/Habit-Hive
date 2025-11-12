// src/pages/AboutUs.jsx
import pinkbee from "/pinkbee.jpeg";

export default function AboutUs() {
  return (
    <div className="container">
      <div className="app-header">
        <div className="brand">
          <img src={pinkbee} alt="Habit Hive logo" className="logo-img" />
          <div>
            <div className="h1">About Us</div>
            <div className="muted">The story behind Habit Hive</div>
          </div>
        </div>
      </div>

      <div className="card">
        <p style={{fontSize:18,lineHeight:1.7,color:'var(--muted)'}}>
          Habit Hive started as a small idea — to make habit tracking gentle, pastel, and positive.
          We wanted something that feels more like a cozy space than an app — where even a single
          checkmark feels like a celebration 🐝.
        </p>
        <p style={{fontSize:18,lineHeight:1.7,color:'var(--muted)'}}>
          Built with love, color gradients, and lots of caffeine 💖. Whether you're sipping water,
          finishing pages, or just taking a moment for yourself — Habit Hive reminds you that progress
          is still progress.
        </p>
      </div>
    </div>
  )
}
