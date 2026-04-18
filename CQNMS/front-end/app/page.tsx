"use client";
import { useEffect, useState } from 'react';
import StatsPanel from './components/StatsPanel';
import NetworkMap from './components/NetworkMap';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [selectedAlgo, setSelectedAlgo] = useState("Round Robin");
  const [intensity, setIntensity] = useState(1000);

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:8000/api/stats?algo=${selectedAlgo}&intensity=${intensity}`)
        .then(res => res.json())
        .then(setStats)
        .catch(err => console.error("API Error:", err));
    };
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [selectedAlgo, intensity]);

  // Dynamic color for bars
  const getBarColor = (load: number) => {
    if (load > 80) return 'bg-red-500';
    if (load > 60) return 'bg-yellow-500';
    if (load > 30) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <main className="h-screen w-full bg-[#f8fafc] p-4 font-sans text-slate-900 overflow-hidden flex flex-col gap-4">
      
      {/* 1. White Slim Header */}
      <header className="h-[60px] bg-white border border-slate-200 rounded-lg px-6 flex items-center justify-between shadow-sm shrink-0">
        <h1 className="text-black-800 font-black tracking-tight text-sm uppercase">
          FYP - <span className="text-black-600">CQNMS Load Management System</span>
        </h1>
        <div className="flex items-center gap-2">
           <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Live</span>
        </div>
      </header>

      {/* 2. Control Strip */}
      <div className="bg-white border border-slate-200 rounded-lg p-2 px-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded border border-slate-100">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Traffic Input Intensity:</span>
            <input 
              type="number" value={intensity} 
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-16 bg-transparent border-none p-0 text-xs font-black text-blue-600 focus:outline-none text-center"
            />
          </div>
          <div className="flex gap-2">
            {["Round Robin", "SJF", "Priority", "Least Loaded"].map(a => (
              <button key={a} onClick={() => setSelectedAlgo(a)}
                className={`px-4 py-1.5 rounded text-[9px] font-bold uppercase transition-all border ${selectedAlgo === a ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}>
                {a}
              </button>
            ))}
          </div>
      </div>

      {/* 3. Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <div className="col-span-12 lg:col-span-2 flex flex-col min-h-0">
            <StatsPanel stats={stats} />
        </div>

        <div className="col-span-12 lg:col-span-7 bg-white border border-slate-200 rounded-lg p-4 relative shadow-sm overflow-hidden">
           <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
              <span className="bg-black-900 text-white text-[9px] font-black px-3 py-1.5 rounded uppercase tracking-widest">Network Topology Map</span>
           </div>
           <div className="w-full h-full">
              <NetworkMap stats={stats} />
           </div>
        </div>

        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 min-h-0">
          <div className="h-[35%] bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Server Utilization</h3>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              {stats?.servers?.map((s: any) => (
                <div key={s.name}>
                  <div className="flex justify-between text-[9px] font-bold mb-1">
                    <span className="text-slate-600 uppercase tracking-tighter">{s.name}</span>
                    <span className="text-black-900 font-black">{s.load}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-700 ${getBarColor(s.load)}`} style={{ width: `${s.load}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-[#000000] p-4 rounded-lg shadow-xl border border-slate-800 flex flex-col min-h-0 relative">
            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Algorithm Logs</h3>
            <div className="flex-1 overflow-y-auto space-y-2 font-mono pr-1" style={{ scrollbarWidth: 'none' }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              {stats?.logs?.map((log: any, i: number) => (
                <div key={i} className="text-[10px] py-2 border-b border-white/5 last:border-0" style={{ borderLeft: `3px solid ${log.color || '#3b82f6'}`, paddingLeft: '8px' }}>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold uppercase tracking-tighter text-[9px]" style={{ color: log.color || '#3b82f6' }}>{log.algo}</span>
                    <span className="text-[8px] text-slate-500">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-300 leading-tight">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}