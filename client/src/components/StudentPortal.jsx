import { useEffect,useState } from 'react';
import api from '../api';

export default function StudentPortal({user}) {
 const [summary,setSummary]=useState({records:[],percentage:0,present:0,absent:0,late:0});
 useEffect(()=>{api.get('/attendance/mine').then(r=>setSummary(r.data)).catch(()=>{});},[]);
 return <><section className="grid"><div className="stat"><small>Attendance percentage</small><strong>{summary.percentage}%</strong><span>Your overall attendance</span></div><div className="stat"><small>Present</small><strong>{summary.present}</strong><span>Classes attended</span></div><div className="stat"><small>Absent</small><strong>{summary.absent}</strong><span>Classes missed</span></div><div className="stat"><small>Late</small><strong>{summary.late}</strong><span>Late arrivals</span></div></section><section className="panel"><div className="panel-head"><div><h2>My attendance history</h2><span className="muted">{user.rollNumber||'Student'} · {user.course||'Course'}</span></div></div><div className="table-wrap"><table><thead><tr><th>Date</th><th>Course</th><th>Status</th></tr></thead><tbody>{summary.records.map(r=><tr key={r._id}><td>{new Date(r.date).toLocaleDateString()}</td><td>{r.course||user.course||'—'}</td><td><span className={'pill '+r.status}>{r.status}</span></td></tr>)}</tbody></table>{!summary.records.length&&<div className="empty">Your attendance records will appear here.</div>}</div></section></>;
}
