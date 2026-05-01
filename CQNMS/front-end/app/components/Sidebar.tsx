"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true); // Toggle State
  
  const navItems = [
    { name: 'Live Dashboard', path: '/', icon: '🌐' },
    { name: 'Algo Arena', path: '/arena', icon: '📊' },
    { name: 'Innovation Vault', path: '/innovation', icon: '💡' },
  ];

  return (
    <div 
      className={`relative bg-black h-screen p-6 text-white flex flex-col transition-all duration-300 ease-in-out border-r border-white/10 z-50 ${
        isExpanded ? 'w-72' : 'w-20'
      }`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-10 bg-white text-black border border-slate-200 rounded-full p-1 hover:scale-110 transition-transform shadow-md"
      >
        {isExpanded ? '❮' : '❯'}
      </button>

      {/* Brand Section */}
      <div className={`mb-12 flex items-center gap-3 overflow-hidden ${!isExpanded && 'justify-center'}`}>
        <div className="min-w-[32px] h-8 bg-white text-black font-black flex items-center justify-center rounded-lg text-sm">
          C
        </div>
        {isExpanded && (
          <div className="whitespace-nowrap transition-opacity duration-300">
            <h2 className="text-xl font-black tracking-tighter text-white">CQNMS</h2>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest italic">v2.1 Engine</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path} 
            title={!isExpanded ? item.name : ""}
            className={`flex items-center rounded-xl text-xs font-black uppercase transition-all overflow-hidden ${
              pathname === item.path 
                ? 'bg-white text-black shadow-lg' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            } ${isExpanded ? 'px-5 py-4 gap-4' : 'p-4 justify-center'}`}
          >
            <span className="text-lg">{item.icon}</span>
            {isExpanded && <span className="whitespace-nowrap">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Status */}
      <div className="mt-auto pt-8 border-t border-white/10">
        <div className={`flex items-center gap-3 bg-white/5 p-4 rounded-xl ${!isExpanded && 'justify-center'}`}>
          <div className="h-2 w-2 min-w-[8px] bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></div>
          {isExpanded && (
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
              System Live
            </p>
          )}
        </div>
      </div>
    </div>
  );
}