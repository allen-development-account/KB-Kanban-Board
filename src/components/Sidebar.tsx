import React from 'react';
import { Info, Users, Settings, Activity, ListTodo, CheckSquare, BarChart2, Map, ChevronDown, Plus, Flame, Monitor, Palette } from 'lucide-react';

export function Sidebar({ currentView, onViewChange }: { currentView: string, onViewChange: (view: string) => void }) {
  return (
    <div className="w-[260px] flex-shrink-0 bg-bg-surface border-r border-border-subtle flex flex-col overflow-y-auto custom-scrollbar">
      <div className="pt-6 px-6 pb-4">
        <h1 className="text-lg font-semibold text-white tracking-wide">iOPEX</h1>
      </div>

      <div className="px-4 py-2 flex flex-col gap-2">
        <SidebarItem icon={<Info />} label="About" active={currentView === 'About'} onClick={() => onViewChange('About')} />
        <SidebarItem icon={<Users />} label="Members" active={currentView === 'Members'} onClick={() => onViewChange('Members')} />
        <SidebarItem icon={<Settings />} label="Project Settings" active={currentView === 'Project Settings'} onClick={() => onViewChange('Project Settings')} />
      </div>

      <div className="px-4 py-4 flex flex-col gap-2 border-t border-border-subtle mt-2">
        <SidebarItem icon={<Activity />} label="Activities" badge="4" active={currentView === 'Activities'} onClick={() => onViewChange('Activities')} />
        <SidebarItem icon={<ListTodo />} label="Backlog" active={currentView === 'Backlog'} onClick={() => onViewChange('Backlog')} />
        <SidebarItem icon={<CheckSquare />} label="My Tasks" active={currentView === 'My Tasks'} onClick={() => onViewChange('My Tasks')} />
        <SidebarItem icon={<BarChart2 />} label="Reports" badge="12" active={currentView === 'Reports'} onClick={() => onViewChange('Reports')} />
        <SidebarItem icon={<Map />} label="Roadmap" active={currentView === 'Roadmap'} onClick={() => onViewChange('Roadmap')} />
      </div>

      <div className="px-4 py-4 flex flex-col gap-2 border-t border-border-subtle">
        <div className="flex items-center text-[11px] font-semibold text-text-muted mb-2 px-2 tracking-wider">
          <ChevronDown className="w-3.5 h-3.5 mr-1" />
          BOARDS
        </div>
        <SidebarItem icon={<Monitor className="w-4 h-4 text-blue-400" />} label="Research & Development" active={currentView === 'Research & Development'} onClick={() => onViewChange('Research & Development')} />
        <button className="flex items-center text-text-muted hover:text-white px-2 py-2 mt-1 text-sm transition-colors">
          <Plus className="w-4 h-4 mr-3" />
          Create New Board
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-2 border-t border-border-subtle">
        <div className="flex items-center text-[11px] font-semibold text-text-muted mb-2 px-2 tracking-wider">
          <ChevronDown className="w-3.5 h-3.5 mr-1" />
          DISCUSSION
        </div>
        <SidebarItem icon={<span className="text-lg leading-none">🎉</span>} label="Project Discussion" badge="10" active={currentView === 'Project Discussion'} onClick={() => onViewChange('Project Discussion')} />
        <SidebarItem icon={<span className="text-lg leading-none">📦</span>} label="Resources" active={currentView === 'Resources'} onClick={() => onViewChange('Resources')} />
        <button className="flex items-center text-text-muted hover:text-white px-2 py-2 mt-1 text-sm transition-colors">
          <Plus className="w-4 h-4 mr-3" />
          Create New Discussion
        </button>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, badge, active, onClick }: { icon: React.ReactNode, label: string, badge?: string, active?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-center w-full h-[40px] px-2 rounded-lg transition-colors ${active ? 'bg-bg-card text-white' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}>
      <div className="w-5 h-5 flex items-center justify-center mr-3">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' }) : icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
      {badge && (
        <span className="ml-auto bg-bg-card border border-border-subtle text-[11px] font-medium px-2 py-0.5 rounded-md text-text-muted">
          {badge}
        </span>
      )}
    </button>
  );
}
