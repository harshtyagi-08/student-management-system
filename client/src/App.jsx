import { useEffect, useState } from 'react';
import api from './api';
import Login from './components/Login';
import Overview from './components/Overview';
import Students from './components/Students';
import Attendance from './components/Attendance';
import StudentPortal from './components/StudentPortal';

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('overview');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('sams_token');
    if (token) api.get('/auth/me').then(r => setUser(r.data.user)).catch(() => localStorage.removeItem('sams_token'));
  }, []);

  const logout = () => { localStorage.removeItem('sams_token'); setUser(null); setPage('overview'); };
  if (!user) return <Login onLogin={setUser} />;
  const student = user.role === 'student';
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">C</span><div><b>CampusTrack</b><small>ATTENDANCE PORTAL</small></div></div>
      <div className="profile"><div className="avatar">{user.name?.[0]?.toUpperCase()}</div><div><b>{user.name}</b><small>{user.role}</small></div></div>
      <nav>
        {(student ? [['overview','My Overview'],['attendance','My Attendance']] : [['overview','Dashboard'],['students','Students'],['attendance','Attendance']]).map(([id,label]) =>
          <button key={id} className={page===id?'nav-item active':'nav-item'} onClick={()=>{setPage(id);setError('')}}>{label}</button>)}
      </nav>
      <button className="logout" onClick={logout}>Sign out ↗</button>
    </aside>
    <main className="main-content">
      <header className="topbar"><div><span className="eyebrow">COLLEGE MANAGEMENT</span><h1>{page==='overview'?(student?'Student overview':'Dashboard'):page==='students'?'Student management':'Attendance'}</h1></div><span className="today">{new Date().toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short',year:'numeric'})}</span></header>
      {error && <p className="notice error">{error}</p>}
      {student ? <StudentPortal user={user} /> : page==='students' ? <Students setError={setError}/> : page==='attendance' ? <Attendance setError={setError}/> : <Overview user={user}/>}
    </main>
  </div>;
}
