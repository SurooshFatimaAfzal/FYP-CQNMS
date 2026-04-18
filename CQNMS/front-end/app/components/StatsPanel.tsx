export default function StatsPanel({ stats }: any) {
  const metrics = [
    { label: "Traffic", val: stats?.incoming_req_count || 0, unit: "req/s", color: "bg-blue-600", text: "text-blue-600" },
    { label: "Latency", val: stats?.latency || 0, unit: "ms", color: "bg-indigo-600", text: "text-indigo-600" },
    { label: "Efficiency", val: stats?.throughput || 0, unit: "%", color: "bg-emerald-600", text: "text-emerald-600" },
    { label: "Queue", val: stats?.queue_length || 0, unit: "req", color: "bg-orange-600", text: "text-orange-600" },
  ];

  return (
    <div className="flex flex-col gap-3 h-full">
      {metrics.map((m, i) => (
        <div key={i} className="flex-1 bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex flex-col justify-center transition-all hover:border-slate-300">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-1 h-3 ${m.color}`}></div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{m.label}</p>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black tabular-nums tracking-tighter ${m.text}`}>{m.val}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{m.unit}</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden opacity-60">
            <div 
              className={`h-full ${m.color} transition-all duration-1000`} 
              style={{ width: `${Math.min(100, (m.val / (i === 0 ? 50 : 100)) * 100)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}