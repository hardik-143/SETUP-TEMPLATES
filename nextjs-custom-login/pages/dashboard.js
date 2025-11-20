import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function Dashboard(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load(){
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        Router.push('/login');
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    }
    load();
  },[]);

  async function handleLogout(){
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    Router.push('/');
  }

  if (loading) return <div style={{fontFamily:'Arial', padding:20}}>Loading...</div>

  if(!user) return null;
  return (
    <div style={{maxWidth:600, margin:'40px auto', fontFamily:'Arial'}}>
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}</p>
      <p>Your id: {user._id}</p>
      <div style={{marginTop:12}}>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  )
}

