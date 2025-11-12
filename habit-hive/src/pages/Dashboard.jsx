// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "../App.css";
import { Plus, Minus, Edit, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{fetchHabits()},[]);

  async function fetchHabits(){
    try{
      const res = await apiClient.get("/habits");
      setHabits(res.data);
    }catch(e){ console.error(e); }
    finally{ setLoading(false); }
  }

  async function handleUpdate(id, action){
    try{
      const res = await apiClient.put(`/habits/${id}/${action}`);
      setHabits((prev)=> prev.map(h=> h._id===id ? res.data : h));
    }catch(e){ console.error(e); }
  }

  async function handleDelete(id){
    if(!confirm("Delete habit?")) return;
    try{ await apiClient.delete(`/habits/${id}`); setHabits(prev=>prev.filter(h=>h._id!==id)); }
    catch(e){ console.error(e); }
  }

  if(loading) return <div className="container center"><div className="h2">Loading your habits…</div></div>

  return (
    <div className="container">
      <div className="app-header">
        <div className="brand">
        <img src="/pinkbee.jpeg" alt="Habit Hive logo" className="logo-img" />

          <div>
            <div className="h1">Dashboard</div>
            <div className="muted">Your daily wins, big and small</div>
          </div>
        </div>
        <div className="nav-links">
          <a href="/habitform" className="btn small">Add Habit</a>
        </div>
      </div>

      <div className="grid three">
        {habits.length===0 && <div className="card">No habits yet — add one to begin.</div>}
        {habits.map(habit=>{
          const percent = habit.goal>0 ? Math.round((habit.progress/habit.goal)*100) : 0;
          const cls = percent>=100 ? 'completed' : '';
          const pctClass = percent < 30 ? 'p0' : percent < 60 ? 'p30' : percent < 90 ? 'p60' : 'p90';
          return (
            <div key={habit._id} className={`card habit-card ${cls}`}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div className="habit-title" style={{fontSize:20}}>{habit.title}</div>
                  <div className="habit-sub">{habit.progress}/{habit.goal} {habit.unit} • {percent}%</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn small" onClick={()=>handleUpdate(habit._id,'increment')}><Plus size={14}/></button>
                  <button className="btn small" onClick={()=>handleUpdate(habit._id,'decrement')} style={{background:'linear-gradient(90deg,#ffd1f2,#d9d3ff)'}}><Minus size={14}/></button>
                </div>
              </div>

              <div className="mt-6">
                <div className="progress-bar">
                  <div className={`progress-fill ${pctClass}`} style={{width:`${Math.min(percent,100)}%`}}></div>
                </div>
              </div>

              <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
                <div className="muted">Updated: {new Date(habit.updatedAt).toLocaleDateString()}</div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn ghost small" onClick={()=>alert('Edit: implement edit flow') }><Edit size={14} /></button>
                  <button className="btn ghost small" onClick={()=>handleDelete(habit._id)} style={{color:'#ffb6d9'}}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
