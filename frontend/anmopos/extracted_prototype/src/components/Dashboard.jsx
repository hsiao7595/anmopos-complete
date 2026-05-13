
import React, { useState, useEffect } from 'react';
import RoomGrid from './RoomGrid';
import StaffQueue from './StaffQueue';
import Sidebar from './Sidebar';

const Dashboard = () => {
  // 模擬房態數據
  const [rooms, setRooms] = useState([
    { id: '01', name: '房01', status: 'busy', timeLeft: 15, staff: '08' },
    { id: '02', name: '房02', status: 'empty', timeLeft: 0, staff: null },
    { id: '03', name: '房03', status: 'cleaning', timeLeft: 5, staff: null },
    { id: '05', name: '房05', status: 'busy', timeLeft: 8, staff: '12' },
    { id: '06', name: '房06', status: 'empty', timeLeft: 0, staff: null },
  ]);

  // 模擬師傅輪牌數據 (大輪順序)
  const [staffList, setStaffList] = useState([
    { id: '01', name: '師傅01', status: 'waiting', isRequested: false },
    { id: '05', name: '師傅05', status: 'waiting', isRequested: true },
    { id: '16', name: '師傅16', status: 'waiting', isRequested: false },
    { id: '08', name: '師傅08', status: 'busy', isRequested: false },
    { id: '12', name: '師傅12', status: 'busy', isRequested: false },
  ]);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white overflow-hidden font-sans">
      <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 shadow-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-emerald-400">御手足悦 / 足不老 運營系統</h1>
          <span className="text-sm text-slate-400">按摩館模式 (Default)</span>
        </div>
        <div className="flex gap-8 text-sm">
          <div>今日營收: <span className="text-emerald-400 font-mono">$45,800</span></div>
          <div>待命師傅: <span className="text-yellow-400 font-mono">8</span></div>
          <div>在場人數: <span className="text-blue-400 font-mono">12</span></div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <RoomGrid rooms={rooms} />
        </main>
        <aside className="w-80 bg-slate-800 border-l border-slate-700 p-4">
          <Sidebar />
        </aside>
      </div>
      <footer className="h-40 bg-slate-900 border-t border-slate-700 p-4">
        <StaffQueue staffList={staffList} />
      </footer>
    </div>
  );
};
export default Dashboard;
