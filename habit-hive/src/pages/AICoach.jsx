// src/pages/AICoach.jsx
import React, { useState } from "react";
import apiClient from "../api/apiClient";
import "../App.css";

export default function AICoach(){
  const [prompt,setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading,setLoading] = useState(false);

  async function sendPrompt(){
    if(!prompt.trim()) return;
    const user = {role:'user', content:prompt};
    setMessages(prev=>[...prev,user]);
    setPrompt(""); setLoading(true);

    try{
      const res = await apiClient.post("/ai/coach",{ prompt });
      setMessages(prev=>[...prev, {role:'assistant', content: res.data.reply}]);
    }catch(e){
      console.error(e);
      setMessages(prev=>[...prev, {role:'assistant', content:'Sorry — the coach is sleeping rn.'}]);
    }finally{ setLoading(false) }
  }

  return (
    <div className="container">
      <div className="app-header">
        <div className="brand">
        <img src="/pinkbee.jpeg" alt="Habit Hive logo" className="logo-img" />
          <div>
            <div className="h1">AI Coach</div>
            <div className="muted">Friendly, short tips whenever you need one</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="chat-wrap">
          <div className="chat-window">
            {messages.length===0 ? (
              <div className="muted">Ask your coach something like “how do i stay consistent?”</div>
            ) : (
              messages.map((m,i)=>(
                <div key={i} style={{marginTop:8}} className={m.role==='user' ? 'bubble user' : 'bubble ai'}>
                  {m.content}
                </div>
              ))
            )}
          </div>

          <div style={{display:'flex',gap:12, marginTop:12}}>
            <input className="input" placeholder="Ask HiveBuddy..." value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && sendPrompt()} />
            <button className="btn" onClick={sendPrompt} disabled={loading}>{loading ? '...' : 'Ask'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
