"use client";
import React, { useMemo } from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';

export default function NetworkMap({ stats }: any) {
  // 1. Nodes Logic: Text aur Border ko 0 par change karna
  const nodes = useMemo(() => {
    const isIdle = !stats || stats.traffic <= 0;
    
    const baseNodes = [
      { 
        id: 'lb', 
        position: { x: 300, y: 20 }, 
        data: { label: '🌐 Load Balancer' }, 
        style: { 
          background: isIdle ? '#64748b' : '#1e293b', // Idle par grey ho jayega
          color: '#fff', 
          borderRadius: '8px', 
          fontSize: '10px', 
          width: 120, 
          textAlign: 'center' as const,
          transition: 'all 0.5s'
        } 
      }
    ];

    if (!stats?.servers) return baseNodes;

    const serverNodes = stats.servers.map((s: any, i: number) => ({
      id: `s${i + 1}`,
      position: { x: 50 + (i * 160), y: 180 },
      data: { label: `🖥️ ${s.name}\n${s.load}%` },
      style: { 
        fontSize: '9px', 
        width: 100, 
        borderRadius: '8px',
        textAlign: 'center' as const,
        border: s.load > 80 ? '2px solid #ef4444' : '1px solid #cbd5e1',
        background: s.load > 80 ? '#fef2f2' : (isIdle ? '#f8fafc' : '#fff'),
        opacity: isIdle ? 0.6 : 1, // Idle par thora light dikhega
        transition: 'all 0.5s'
      }
    }));

    return [...baseNodes, ...serverNodes];
  }, [stats]);

  // 2. Edges Logic: Animation aur Color ko control karna
  const edges = useMemo(() => {
    if (!stats?.servers) return [];
    
    const isIdle = stats.traffic <= 0;

    return stats.servers.map((s: any, i: number) => ({
      id: `e${i + 1}`,
      source: 'lb',
      target: `s${i + 1}`,
      // Traffic zero hone par animation band ho jayegi (REAL-TIME FEEL)
      animated: !isIdle, 
      style: { 
        // Zero par light slate color, load par blue, overload par red
        stroke: isIdle ? '#e2e8f0' : (s.load > 80 ? '#ef4444' : '#3b82f6'), 
        strokeWidth: isIdle ? 1 : (s.load > 80 ? 3 : 1.5),
        transition: 'stroke 0.5s, stroke-width 0.5s'
      }
    }));
  }, [stats]);

  return (
    <div className="w-full h-full">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background gap={15} color="#f1f5f9" />
      </ReactFlow>
    </div>
  );
}