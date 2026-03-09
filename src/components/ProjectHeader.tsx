import React from 'react';
import { Monitor, SlidersHorizontal, ArrowUpDown, LayoutGrid, Eye, UserPlus, Share2, MoreHorizontal } from 'lucide-react';

export function ProjectHeader() {
  return (
    <div className="flex-shrink-0 px-8 pt-8 pb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-bg-surface border border-border-subtle rounded-xl flex items-center justify-center shadow-sm">
            <Monitor className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-[28px] font-semibold text-white tracking-tight">Research & Development</h2>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Deadline</span>
            <span className="text-sm font-medium text-white">5 Oct 2021</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">Date</span>
            <span className="text-sm font-medium text-white">20 Sep 2021</span>
          </div>
          <div className="flex items-center ml-4">
            <UserPills users={['allen', 'ayush', 'edwin']} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-white transition-colors">
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
      {label}
    </button>
  );
}

export function UserPills({ users }: { users: string[] }) {
  const getUserName = (id: string) => {
    switch(id.toLowerCase()) {
      case 'allen': return 'Allen';
      case 'ayush': return 'Ayush';
      case 'edwin': return 'Edwin';
      default: return id;
    }
  };

  const getUserColor = (id: string) => {
    switch(id.toLowerCase()) {
      case 'allen': return 'bg-zinc-800 text-zinc-300 border-zinc-700';
      case 'ayush': return 'bg-zinc-700 text-zinc-200 border-zinc-600';
      case 'edwin': return 'bg-zinc-600 text-zinc-100 border-zinc-500';
      default: return 'bg-bg-surface text-text-muted border-border-subtle';
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {users.map((u, i) => (
        <span 
          key={i}
          className={`px-3 py-1 rounded-full border text-xs font-medium ${getUserColor(u)}`}
        >
          {getUserName(u)}
        </span>
      ))}
    </div>
  );
}
