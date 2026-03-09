import React from 'react';
import { Search, Settings, Bell, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <header className="h-[72px] flex-shrink-0 border-b border-border-subtle flex items-center justify-between px-8 bg-bg-deep">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full h-10 bg-bg-surface border border-border-subtle rounded-lg pl-10 pr-4 text-sm text-white placeholder-text-muted focus:outline-none focus:border-border-subtle/80 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="text-text-muted hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="text-text-muted hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-deep"></span>
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-border-subtle cursor-pointer hover:opacity-80 transition-opacity">
          <img src="https://picsum.photos/seed/allen/32/32" alt="ALLEN" className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
          <span className="text-sm font-medium text-white">ALLEN</span>
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </div>
      </div>
    </header>
  );
}
