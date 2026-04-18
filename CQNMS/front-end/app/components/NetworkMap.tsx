"use client";
import React, { useMemo } from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';

// 1. Inhein component se bahar rakhein taake React inhein baar baar "naya" na samjhe
const nodeTypes = {}; 
const edgeTypes = {};

export default function NetworkMap({ stats }: any) {
  // Nodes Memoization
  const nodes = useMemo(() => {
    const isIdle = !stats || stats.traffic <= 0;
    
    const baseNodes = [
      { 
        id: 'lb', 
        position: { x: 300, y: 20 }, 
        data: { label: '🌐 Load Balancer' }, 
        style: { 
          background: isIdle ? '#64748b' : '#1e293b', 
          color: '#fff', borderRadius: '6px', fontSize: '10px', 
          width: 120, textAlign: 'center' as const, transition: 'all 0.5s'
        } 
      }
    ];

    if (!stats?.servers) return baseNodes;

    const serverNodes = stats.servers.map((s: any, i: number) => ({
      id: `s${i + 1}`,
      position: { x: 50 + (i * 160), y: 180 },
      data: { label: `🖥️ ${s.name}\n${s.load}%` },
      style: { 
        fontSize: '9px', width: 100, borderRadius: '6px', textAlign: 'center' as const,
        border: s.load > 80 ? '2px solid #ef4444' : '1px solid #cbd5e1',
        background: s.load > 80 ? '#fef2f2' : (isIdle ? '#f8fafc' : '#fff'),
        transition: 'all 0.5s'
      }
    }));

    return [...baseNodes, ...serverNodes];
  }, [stats]);

  // Edges Memoization
  const edges = useMemo(() => {
    if (!stats?.servers) return [];
    const isIdle = !stats || stats.traffic <= 0;

    return stats.servers.map((s: any, i: number) => {
      let strokeColor = isIdle ? '#e2e8f0' : (s.load > 80 ? '#ef4444' : s.load > 40 ? '#f59e0b' : '#3b82f6');
      let strokeWidth = isIdle ? 1 : (s.load > 80 ? 3 : 1.5);

      return {
        id: `e${i + 1}`,
        source: 'lb',
        target: `s${i + 1}`,
        animated: !isIdle, 
        style: { stroke: strokeColor, strokeWidth, transition: 'stroke 0.5s, stroke-width 0.5s' }
      };
    });
  }, [stats]);

  return (
    <div className="w-full h-full">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        // 2. Props yahan pass karein
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView 
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background gap={15} color="#f8fafc" />
      </ReactFlow>
    </div>
  );
}