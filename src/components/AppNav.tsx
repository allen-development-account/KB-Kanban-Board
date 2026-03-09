import React from 'react';
import { Hexagon, Layout, MessageSquare, Zap, Settings, Plus } from 'lucide-react';

export function AppNav() {
  return (
    <div className="w-[72px] flex-shrink-0 bg-bg-surface border-r border-border-subtle flex flex-col items-center py-6 gap-4 z-20">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
        <Hexagon className="w-6 h-6 text-blue-600 fill-current" />
      </div>
      
      <NavIcon icon={<Layout className="w-5 h-5" />} color="text-orange-500" bg="bg-orange-500/10" />
      <NavIcon icon={<MessageSquare className="w-5 h-5" />} color="text-orange-400" bg="bg-orange-400/10" />
      <NavIcon icon={<Zap className="w-5 h-5" />} color="text-orange-300" bg="bg-orange-300/10" />
      <NavIcon icon={<Hexagon className="w-5 h-5" />} color="text-orange-200" bg="bg-orange-200/10" />
      
      <div className="mt-auto flex flex-col gap-4">
        <NavIcon icon={<Settings className="w-5 h-5" />} color="text-text-muted" />
        <button className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-text-muted hover:text-white hover:bg-white/5 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function NavIcon({ icon, color, bg = "bg-transparent" }: { icon: React.ReactNode, color: string, bg?: string }) {
  return (
    <button className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} ${color} hover:opacity-80 transition-opacity`}>
      {icon}
    </button>
  );
}
