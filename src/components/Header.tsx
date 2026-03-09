import React, { useState } from 'react';
import { Search, Settings, Bell, ChevronDown } from 'lucide-react';
import { SettingsModal } from './SettingsModal';
import { ProfileModal } from './ProfileModal';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Allen assigned you to "Technical Feasibility"', time: '10m ago', unread: true },
    { id: 2, text: 'Ayush commented on "Market Analysis"', time: '1h ago', unread: true },
    { id: 3, text: 'Edwin moved "Project Kickoff" to Completed', time: '2h ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="h-[72px] flex-shrink-0 border-b border-border-subtle flex items-center justify-between px-8 bg-bg-deep">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
          <div className="w-full h-10 bg-bg-surface border border-border-subtle rounded-lg pl-10 pr-4 flex items-center justify-between text-sm text-text-muted cursor-text hover:border-text-muted transition-colors" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
            <span>Search anything...</span>
            <div className="flex items-center gap-1">
              <kbd className="bg-bg-deep border border-border-subtle rounded px-1.5 py-0.5 text-[10px] font-mono">⌘</kbd>
              <kbd className="bg-bg-deep border border-border-subtle rounded px-1.5 py-0.5 text-[10px] font-mono">K</kbd>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="text-text-muted hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-text-muted hover:text-white transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-deep"></span>
            )}
          </button>
          
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
              <div className="absolute right-0 mt-4 w-80 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-bg-deep/50">
                  <h3 className="font-semibold text-white text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs text-accent hover:text-blue-400 transition-colors font-medium">Mark all as read</button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {notifications.length > 0 ? notifications.map(n => (
                    <div key={n.id} className={`p-4 border-b border-border-subtle last:border-0 hover:bg-white/5 transition-colors cursor-pointer flex flex-col gap-1 ${n.unread ? 'bg-accent/5' : ''}`}>
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm ${n.unread ? 'text-white font-medium' : 'text-text-muted'}`}>{n.text}</p>
                        {n.unread && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5"></div>}
                      </div>
                      <p className="text-xs text-text-muted">{n.time}</p>
                    </div>
                  )) : (
                    <div className="p-8 text-center text-text-muted text-sm">No new notifications</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div 
          onClick={() => setIsProfileOpen(true)}
          className="flex items-center gap-3 pl-6 border-l border-border-subtle cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src="https://picsum.photos/seed/allen/32/32" alt="ALLEN" className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
          <span className="text-sm font-medium text-white">ALLEN</span>
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </div>
      </div>
      
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  );
}
