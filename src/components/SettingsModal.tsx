import React, { useState } from 'react';
import { X, Monitor, Globe, Clock, Bell, Mail, Layout, Download, Trash2, Check } from 'lucide-react';

export function SettingsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('general');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC-7');
  
  const [emailNotifs, setEmailNotifs] = useState({ assigned: true, mentions: true, dueDates: false });
  const [pushNotifs, setPushNotifs] = useState(true);

  const [boardPrefs, setBoardPrefs] = useState({ defaultView: 'kanban', showCompleted: true, compactMode: false });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-bg-surface border border-border-subtle rounded-2xl w-[800px] h-[600px] shadow-2xl flex overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sidebar */}
        <div className="w-64 bg-bg-deep border-r border-border-subtle p-6 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white mb-6">Settings</h2>
          
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'general' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <Monitor className="w-4 h-4" /> General
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'notifications' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('board')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'board' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <Layout className="w-4 h-4" /> Board Preferences
          </button>
          <button 
            onClick={() => setActiveTab('advanced')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'advanced' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <Monitor className="w-4 h-4" /> Advanced
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-text-muted hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>

          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">General Settings</h3>
                <p className="text-sm text-text-muted mb-6">Manage your basic application preferences.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['light', 'dark', 'system'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`flex items-center justify-center gap-2 py-3 border rounded-xl text-sm font-medium capitalize transition-all ${theme === t ? 'border-accent bg-accent/10 text-accent' : 'border-border-subtle text-text-muted hover:border-white/20 hover:text-white'}`}
                      >
                        {theme === t && <Check className="w-4 h-4" />}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Language</label>
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-bg-deep border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                    >
                      <option value="en">English (US)</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Timezone</label>
                    <select 
                      value={timezone} 
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full bg-bg-deep border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                    >
                      <option value="UTC-8">Pacific Time (PT)</option>
                      <option value="UTC-7">Mountain Time (MT)</option>
                      <option value="UTC-6">Central Time (CT)</option>
                      <option value="UTC-5">Eastern Time (ET)</option>
                      <option value="UTC+0">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Notifications</h3>
                <p className="text-sm text-text-muted mb-6">Choose how you want to be notified.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-bg-deep border border-border-subtle rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                        <p className="text-xs text-text-muted">Receive updates in your inbox.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-border-subtle">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-text-muted group-hover:text-white transition-colors">When a task is assigned to me</span>
                      <input type="checkbox" checked={emailNotifs.assigned} onChange={(e) => setEmailNotifs({...emailNotifs, assigned: e.target.checked})} className="w-4 h-4 accent-accent rounded bg-bg-surface border-border-subtle" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-text-muted group-hover:text-white transition-colors">When I am mentioned in a comment</span>
                      <input type="checkbox" checked={emailNotifs.mentions} onChange={(e) => setEmailNotifs({...emailNotifs, mentions: e.target.checked})} className="w-4 h-4 accent-accent rounded bg-bg-surface border-border-subtle" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-text-muted group-hover:text-white transition-colors">When a due date is approaching</span>
                      <input type="checkbox" checked={emailNotifs.dueDates} onChange={(e) => setEmailNotifs({...emailNotifs, dueDates: e.target.checked})} className="w-4 h-4 accent-accent rounded bg-bg-surface border-border-subtle" />
                    </label>
                  </div>
                </div>

                <div className="bg-bg-deep border border-border-subtle rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Push Notifications</h4>
                      <p className="text-xs text-text-muted">Receive notifications in your browser.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={pushNotifs} onChange={(e) => setPushNotifs(e.target.checked)} />
                    <div className="w-11 h-6 bg-bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent border border-border-subtle"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'board' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Board Preferences</h3>
                <p className="text-sm text-text-muted mb-6">Customize how your boards look and feel.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-3">Default View</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setBoardPrefs({...boardPrefs, defaultView: 'kanban'})}
                      className={`flex flex-col items-center justify-center gap-3 p-6 border rounded-xl transition-all ${boardPrefs.defaultView === 'kanban' ? 'border-accent bg-accent/10 text-accent' : 'border-border-subtle text-text-muted hover:border-white/20 hover:text-white'}`}
                    >
                      <Layout className="w-8 h-8" />
                      <span className="text-sm font-medium">Kanban Board</span>
                    </button>
                    <button 
                      onClick={() => setBoardPrefs({...boardPrefs, defaultView: 'list'})}
                      className={`flex flex-col items-center justify-center gap-3 p-6 border rounded-xl transition-all ${boardPrefs.defaultView === 'list' ? 'border-accent bg-accent/10 text-accent' : 'border-border-subtle text-text-muted hover:border-white/20 hover:text-white'}`}
                    >
                      <div className="flex flex-col gap-1 w-8 h-8 justify-center">
                        <div className="w-full h-1.5 bg-current rounded-full"></div>
                        <div className="w-full h-1.5 bg-current rounded-full"></div>
                        <div className="w-3/4 h-1.5 bg-current rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">List View</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer group p-4 border border-border-subtle rounded-xl hover:bg-white/5 transition-colors">
                    <div>
                      <span className="block text-sm font-medium text-white mb-1">Show Completed Tasks</span>
                      <span className="block text-xs text-text-muted">Keep completed tasks visible on the board by default.</span>
                    </div>
                    <input type="checkbox" checked={boardPrefs.showCompleted} onChange={(e) => setBoardPrefs({...boardPrefs, showCompleted: e.target.checked})} className="w-4 h-4 accent-accent rounded bg-bg-surface border-border-subtle" />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer group p-4 border border-border-subtle rounded-xl hover:bg-white/5 transition-colors">
                    <div>
                      <span className="block text-sm font-medium text-white mb-1">Compact Mode</span>
                      <span className="block text-xs text-text-muted">Reduce padding and hide descriptions to fit more cards.</span>
                    </div>
                    <input type="checkbox" checked={boardPrefs.compactMode} onChange={(e) => setBoardPrefs({...boardPrefs, compactMode: e.target.checked})} className="w-4 h-4 accent-accent rounded bg-bg-surface border-border-subtle" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Advanced Settings</h3>
                <p className="text-sm text-text-muted mb-6">Data management and danger zone.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-bg-deep border border-border-subtle rounded-xl p-5">
                  <h4 className="text-sm font-medium text-white mb-2">Export Data</h4>
                  <p className="text-xs text-text-muted mb-4">Download a copy of all your boards, tasks, and activity.</p>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-border-subtle rounded-lg text-sm font-medium text-white transition-colors">
                      <Download className="w-4 h-4" /> Export as JSON
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-border-subtle rounded-lg text-sm font-medium text-white transition-colors">
                      <Download className="w-4 h-4" /> Export as CSV
                    </button>
                  </div>
                </div>

                <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-5">
                  <h4 className="text-sm font-medium text-red-500 mb-2">Danger Zone</h4>
                  <p className="text-xs text-text-muted mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium transition-colors">
                    <Trash2 className="w-4 h-4" /> Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
