
import React from 'react';
const Sidebar = () => {
  const actions = [
    { label: '快速開單 / 接客', color: 'bg-emerald-600' },
    { label: '師傅輪牌牆管理', color: 'bg-slate-700' },
    { label: '會員儲值核銷', color: 'bg-slate-700' },
    { label: '跨店報表查詢', color: 'bg-slate-700' },
    { label: '換房 / 換師傅', color: 'bg-amber-600' },
    { label: '結帳與發票', color: 'bg-blue-600' },
  ];
  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-lg font-bold mb-4 border-b border-slate-700 pb-2">功能選單</h2>
      {actions.map((action, i) => (
        <button key={i} className={`w-full py-4 rounded-lg font-bold shadow-md hover:brightness-110 active:scale-95 transition-all ${action.color}`}>{action.label}</button>
      ))}
      <div className="mt-auto pt-6 border-t border-slate-700">
        <button className="w-full py-3 rounded border border-slate-600 text-slate-400 hover:bg-slate-700">系統設定 (Admin)</button>
      </div>
    </div>
  );
};
export default Sidebar;
