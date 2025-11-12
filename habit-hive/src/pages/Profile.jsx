// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../api/user";
import "../App.css";

export default function Profile(){
  const [user,setUser] = useState(null);
  const [name,setName] = useState('');
  const [bio,setBio] = useState('');

  useEffect(()=>{
    (async()=>{
      try{
        const res = await getUserProfile();
        setUser(res);
        setName(res.name||'');
        setBio(res.bio||'');
      }catch(e){ console.error(e) }
    })()
  },[]);

  async function save(){
    try{
      const updated = await updateUserProfile({ name,bio });
      setUser(updated);
      alert('Saved');
    }catch(e){ console.error(e); alert('Save failed') }
  }

  return (
    <div className="container">
      <div className="app-header">
        <div className="brand">
        <img src="/pinkbee.jpeg" alt="Habit Hive logo" className="logo-img" />

          <div>
            <div className="h1">Profile</div>
            <div className="muted">Manage your account</div>
          </div>
        </div>
      </div>

      <div className="card" style={{display:'flex',gap:20,alignItems:'center'}}>
        <div className="profile-card">
          <div className="avatar">{user?.name?.slice(0,2).toUpperCase() || 'U'}</div>
          <div style={{flex:1}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:20,fontWeight:700}}>{user?.name || '—'}</div>
                <div className="muted">{user?.email || '—'}</div>
              </div>
            </div>

            <div style={{marginTop:12}}>
              <textarea className="input" rows={4} value={bio} onChange={e=>setBio(e.target.value)} />
              <div style={{marginTop:10, display:'flex',justifyContent:'flex-end'}}>
                <button className="btn small" onClick={save}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
