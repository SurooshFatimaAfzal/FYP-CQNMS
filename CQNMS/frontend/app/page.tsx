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

  return (
    <main className="h-screen w-full bg-[#f1f5f9] p-4 font-sans text-slate-900 overflow-hidden flex flex-col gap-4">
      
      {/* 1. Header */}
      <header className="h-[60px] bg-[#1e293b] rounded-lg px-6 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center font-black text-white italic">C</div>
          <h1 className="text-white font-bold tracking-tight text-sm uppercase border-l border-slate-600 pl-4">
            CQNMS <span className="text-blue-400 font-medium ml-1 text-xs">v2.1 Control</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded border border-slate-700">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Traffic:</span>
            <input 
              type="number" value={intensity} 
              onChange={(e) => setIntensity(e.target.value === "" ? 0 : Math.max(0, parseInt(e.target.value)))}
              className="w-14 bg-transparent border-none p-0 text-xs font-bold text-blue-400 focus:outline-none text-center"
            />
          </div>
          <div className="flex gap-1 bg-slate-800 p-1 rounded border border-slate-700">
            {["Round Robin", "SJF", "Priority", "Least Loaded"].map(a => (
              <button key={a} onClick={() => setSelectedAlgo(a)}
                className={`px-3 py-1.5 rounded text-[9px] font-bold uppercase transition-all ${selectedAlgo === a ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                {a}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* Left: Stats Column */}
        <div className="col-span-12 lg:col-span-2 flex flex-col min-h-0">
           <StatsPanel stats={stats} />
        </div>

        {/* Center: Node Map */}
        <div className="col-span-12 lg:col-span-7 bg-white border border-slate-200 rounded-lg p-4 relative shadow-sm overflow-hidden">
           <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
              <span className="bg-slate-900 text-white text-[9px] font-black px-3 py-1.5 rounded uppercase tracking-widest">Active Network Infrastructure</span>
              <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-black px-3 py-1.5 rounded uppercase tracking-widest italic font-bold">ALGO: {selectedAlgo}</span>
           </div>
           <div className="w-full h-full">
              <NetworkMap stats={stats} />
           </div>
        </div>

        {/* Right: Monitoring Sidebar */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 min-h-0">
          
          <div className="h-[35%] bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Resource Utilization</h3>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              {stats?.servers?.map((s: any) => (
                <div key={s.name}>
                  <div className="flex justify-between text-[9px] font-bold mb-1">
                    <span className="text-slate-600 uppercase tracking-tight">{s.name}</span>
                    <span className={s.load > 85 ? "text-red-600" : "text-blue-600"}>{s.load}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-sm overflow-hidden">
                    <div className={`h-full transition-all duration-700 ${s.load > 85 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${s.load}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EVENT STREAM - FIXED RENDERING */}
          <div className="flex-1 bg-[#0f172a] p-4 rounded-lg shadow-xl border border-slate-800 flex flex-col min-h-0">
            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Event Stream</h3>
            <div className="flex-1 overflow-y-auto space-y-2 font-mono custom-scrollbar pr-1">
              {stats?.logs?.map((log: any, i: number) => (
                <div key={i} className="text-[10px] py-2 border-b border-white/5 last:border-0" style={{ borderLeft: `3px solid ${log.color || '#3b82f6'}`, paddingLeft: '8px' }}>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold uppercase tracking-tighter" style={{ color: log.color || '#3b82f6' }}>{log.algo}</span>
                    <span className="text-[8px] text-slate-600">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-300 leading-tight">
                    {/* Yahan hum log object ki bajaye log.message render kar rahay hain */}
                    {log.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}