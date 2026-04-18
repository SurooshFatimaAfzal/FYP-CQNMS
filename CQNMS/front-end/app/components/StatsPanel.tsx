"use client";
import React from 'react';

export default function StatsPanel({ stats }: any) {
  const metrics = [
    { label: "Traffic", val: stats?.incoming_req_count || 0, unit: "req/s" },
    { label: "Latency", val: stats?.latency || 0, unit: "ms" },
    { label: "Efficiency", val: stats?.throughput || 0, unit: "%" },
    { label: "Queue", val: stats?.queue_length || 0, unit: "req" },
  ];

  return (
    <div className="flex flex-col gap-2 h-full">
      {metrics.map((m, i) => (
        <div 
          key={i} 
          className="h-[75px] bg-white border border-slate-200 px-4 rounded-lg shadow-sm flex flex-col justify-center transition-all hover:border-blue-400 group"
        >
          {/* Label Text Size optimized */}
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5 group-hover:text-blue-500 transition-colors">
            {m.label}
          </p>
          
          <div className="flex items-baseline gap-1">
            {/* Value Text Size balanced */}
            <span className="text-xl font-black tabular-nums text-slate-900 tracking-tighter">
              {m.val}
            </span>
            {/* Unit Text Size */}
            <span className="text-[8px] font-bold text-slate-400 uppercase">
              {m.unit}
            </span>
          </div>
        </div>
      ))}
      {/* Empty space filler taake cards upar hi rahein agar flex layout use ho raha ho */}
      <div className="flex-1"></div>
    </div>
  );
}