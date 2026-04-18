"use client";
import React, { useMemo } from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';

const nodeTypes = {}; 
const edgeTypes = {};

export default function NetworkMap({ stats }: any) {
  const nodes = useMemo(() => {
    const isIdle = !stats || stats.traffic <= 0;
    const baseNodes = [
      { 
        id: 'lb', 
        position: { x: 300, y: 20 }, 
        data: { label: 'Request Distributor' }, 
        style: { 
          background: isIdle ? '#94a3b8' : '#0f172a', 
          color: '#ffff', borderRadius: '4px', fontSize: '8px', width: 120, textAlign: 'center' as const, transition: 'all 0.5s'
        } 
      }
    ];

    if (!stats?.servers) return baseNodes;

    const serverNodes = stats.servers.map((s: any, i: number) => ({
      id: `s${i + 1}`,
      position: { x: 50 + (i * 160), y: 180 },
      data: { label: `🖥️ ${s.name}\n${s.load}%` },
      style: { 
        fontSize: '9px', width: 100, borderRadius: '4px', textAlign: 'center' as const,
        border: s.load > 80 ? '2px solid #ef4444' : '1px solid #e2e8f0',
        background: s.load > 80 ? '#fef2f2' : '#fff',
        transition: 'all 0.5s'
      }
    }));

    return [...baseNodes, ...serverNodes];
  }, [stats]);

  const edges = useMemo(() => {
    if (!stats?.servers) return [];
    const isIdle = !stats || stats.traffic <= 0;

    return stats.servers.map((s: any, i: number) => ({
      id: `e${i + 1}`,
      source: 'lb',
      target: `s${i + 1}`,
      animated: !isIdle, 
      style: { 
        stroke: isIdle ? '#f1f5f9' : (s.load > 80 ? '#ef4444' : s.load > 40 ? '#f59e0b' : '#3b82f6'), 
        strokeWidth: isIdle ? 1 : (s.load > 80 ? 3 : 1.5),
        transition: 'all 0.5s'
      }
    }));
  }, [stats]);

  return (
    <div className="w-full h-full">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}>
        <Background gap={12} color="#f1f5f9" />
      </ReactFlow>
    </div>
  );
}