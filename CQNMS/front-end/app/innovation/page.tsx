"use client";
import { useEffect, useState } from 'react';

export default function InnovationVault() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/stats?algo=Least Loaded&intensity=3500`);
        const data = await res.json();
        setStats(data);
      } catch (err) { console.error(err); }
    };
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-l-[12px] border-black pl-6">
          <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em]">R&D Core</span>
          <h1 className="text-5xl font-black uppercase tracking-tighter mt-2">Innovation</h1>
        </header>

        <div className="grid gap-8">
          <section className="bg-black rounded-3xl p-10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-black mb-4 uppercase italic border-b border-white/20 pb-4">Predictive Analytics</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">
              Moving away from reactive systems. Our CQNMS engine implements <b>Trend Analysis</b> by calculating load spikes 
              before requests enter the queue. 
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-white/10 p-8 rounded-2xl bg-white/5">
                <p className="text-[9px] text-slate-500 uppercase font-black mb-2 tracking-widest text-center">Prediction Score</p>
                <p className="text-4xl font-black text-center">{stats?.prediction || "0.0"}</p>
              </div>
              <div className="border border-white/10 p-8 rounded-2xl bg-white/5">
                <p className="text-[9px] text-slate-500 uppercase font-black mb-2 tracking-widest text-center">Status</p>
                <p className="text-xl font-black text-center uppercase">{stats?.prediction > 0.7 ? 'Scale Now' : 'Healthy'}</p>
              </div>
              <div className="border border-white/10 p-8 rounded-2xl bg-white/5">
                <p className="text-[9px] text-slate-500 uppercase font-black mb-2 tracking-widest text-center">Global Benchmark</p>
                <p className="text-xl font-black text-center">ELITE</p>
              </div>
            </div>
          </section>

          <section className="bg-[#f0f0f0] rounded-3xl p-10 border border-slate-300">
            <h2 className="text-2xl font-black mb-4 uppercase italic">Self-Healing Infrastructure</h2>
            <p className="text-slate-500 text-sm mb-8">Autonomous node isolation logic implemented through circuit-breaker patterns.</p>
            <div className="flex gap-4">
               {stats?.servers?.map((s: any) => (
                 <div key={s.name} className="flex-1 bg-white p-6 rounded-xl border border-slate-300 text-center shadow-sm">
                    <div className={`h-1.5 w-1.5 rounded-full mx-auto mb-3 ${s.load > 85 ? 'bg-black animate-ping' : 'bg-slate-300'}`}></div>
                    <p className="text-[10px] font-black opacity-30 uppercase">{s.name}</p>
                    <p className="text-xs font-black uppercase mt-1">{s.status}</p>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}