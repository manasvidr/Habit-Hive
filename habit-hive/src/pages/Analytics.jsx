// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "../App.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Analytics(){
  const [habits,setHabits] = useState([]);
  const [loading,setLoading]=useState(true);
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  useEffect(()=>{ fetchHabits() },[]);

  async function fetchHabits(){
    try{ const res = await apiClient.get("/habits"); setHabits(res.data); }
    catch(e){ console.error(e); } finally{ setLoading(false); }
  }

  function formatWeekly(habit){
    const week = days.map(d=>({day:d,value:0}));
    (habit.history||[]).forEach(entry=>{
      const idx = (new Date(entry.date).getDay() + 6) % 7; // Mon=0
      week[idx].value = entry.value;
    });
    return week;
  }

  function combined(){
    const base = days.map(d=>({day:d, total:0}));
    habits.forEach(h=>{
      const w = formatWeekly(h);
      w.forEach((v,i)=> base[i].total += v.value);
    });
    return base;
  }

  if(loading) return <div className="container center"><div className="h2">Loading analytics…</div></div>

  return (
    <div className="container">
      <div className="app-header">
        <div className="brand">
        <img src="/pinkbee.jpeg" alt="Habit Hive logo" className="logo-img" />

          <div>
            <div className="h1">Analytics</div>
            <div className="muted">Weekly snapshots & habit trends</div>
          </div>
        </div>
      </div>

      <div className="card" style={{marginBottom:20}}>
        <div className="h2">All Habits: Weekly Total</div>
        <div style={{height:300}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combined()}>
              <CartesianGrid stroke="#222" strokeDasharray="3 3"/>
              <XAxis dataKey="day" stroke="#cfcfe0"/>
              <YAxis stroke="#cfcfe0"/>
              <Tooltip contentStyle={{background:'#0e0b12',border:'1px solid rgba(255,255,255,0.04)'}} />
              <Line type="monotone" dataKey="total" stroke="#ffd1f2" strokeWidth={3} dot={{r:4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid">
        {habits.map(h=>(
          <div key={h._id} className="card" style={{marginBottom:16}}>
            <div className="h2">{h.title} <span className="muted" style={{fontSize:14}}>({h.progress}/{h.goal} {h.unit})</span></div>
            <div style={{height:200}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatWeekly(h)}>
                  <CartesianGrid stroke="#222" strokeDasharray="3 3"/>
                  <XAxis dataKey="day" stroke="#cfcfe0"/>
                  <YAxis stroke="#cfcfe0"/>
                  <Tooltip contentStyle={{background:'#0e0b12',border:'1px solid rgba(255,255,255,0.04)'}} />
                  <Line type="monotone" dataKey="value" stroke="#bfe9ff" strokeWidth={3} dot={{r:4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
