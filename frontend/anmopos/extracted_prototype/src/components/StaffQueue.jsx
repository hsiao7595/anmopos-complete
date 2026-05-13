
import React from 'react';
const StaffQueue = ({ staffList }) => {
  const waiting = staffList.filter(s => s.status === 'waiting');
  const busy = staffList.filter(s => s.status === 'busy');
  return (
    <div className="flex h-full gap-6">
      <div className="flex-1 flex flex-col">
        <h3 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">大輪待命區 (Next Up)</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {waiting.map((staff, index) => (
            <div key={staff.id} className="relative flex-shrink-0 group">
              <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-emerald-500 flex items-center justify-center text-xl font-bold text-white overflow-hidden">
                {index + 1}
                {staff.isRequested && <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-400 rounded-full border-2 border-slate-900" title="指名"></div>}
              </div>
              <p className="text-center text-xs mt-1 text-slate-300">{staff.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-px bg-slate-700 h-full mx-2"></div>
      <div className="flex-1 flex flex-col opacity-60">
        <h3 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">服務中 (Busy)</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {busy.map(staff => (
            <div key={staff.id} className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-blue-500 flex items-center justify-center text-slate-500 grayscale font-bold">忙</div>
              <p className="text-center text-xs mt-1 text-slate-500">{staff.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StaffQueue;
