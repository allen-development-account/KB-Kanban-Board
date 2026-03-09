import React, { useState } from 'react';
import { X, User, Shield, Activity, Camera, Key, Smartphone, LogOut } from 'lucide-react';

export function ProfileModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('personal');
  
  const [profile, setProfile] = useState({
    name: 'Allen',
    email: 'allendev55@gmail.com',
    bio: 'Product Designer & Developer',
    role: 'Admin'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-bg-surface border border-border-subtle rounded-2xl w-[800px] h-[600px] shadow-2xl flex overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sidebar */}
        <div className="w-64 bg-bg-deep border-r border-border-subtle p-6 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white mb-6">Profile</h2>
          
          <button 
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'personal' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <User className="w-4 h-4" /> Personal Info
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'security' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <Shield className="w-4 h-4" /> Security
          </button>
          <button 
            onClick={() => setActiveTab('activity')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'activity' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <Activity className="w-4 h-4" /> Activity Log
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-text-muted hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>

          {activeTab === 'personal' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Personal Information</h3>
                <p className="text-sm text-text-muted mb-6">Update your photo and personal details.</p>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b border-border-subtle">
                <div className="relative group cursor-pointer">
                  <img src="https://picsum.photos/seed/allen/120/120" alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-bg-deep" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">Change Photo</button>
                    <button className="px-4 py-2 bg-transparent hover:bg-white/5 text-text-muted hover:text-white border border-border-subtle text-sm font-medium rounded-lg transition-colors">Remove</button>
                  </div>
                  <p className="text-xs text-text-muted mt-3">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full bg-bg-deep border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1.5">Role</label>
                    <input 
                      type="text" 
                      value={profile.role}
                      readOnly
                      className="w-full bg-bg-deep/50 border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-muted focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full bg-bg-deep border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1.5">Bio</label>
                  <textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={3}
                    className="w-full bg-bg-deep border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button className="px-5 py-2.5 bg-accent hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Security Settings</h3>
                <p className="text-sm text-text-muted mb-6">Manage your password and account security.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-bg-deep border border-border-subtle rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Password</h4>
                        <p className="text-xs text-text-muted">Last changed 3 months ago.</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-border-subtle rounded-lg text-sm font-medium text-white transition-colors">Change Password</button>
                  </div>
                </div>

                <div className="bg-bg-deep border border-border-subtle rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                        <p className="text-xs text-text-muted">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-accent hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">Enable 2FA</button>
                  </div>
                </div>

                <div className="bg-bg-deep border border-border-subtle rounded-xl p-5">
                  <h4 className="text-sm font-medium text-white mb-4">Active Sessions</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                      <div>
                        <p className="text-sm font-medium text-white">Mac OS • Chrome</p>
                        <p className="text-xs text-text-muted">San Francisco, CA • Active now</p>
                      </div>
                      <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">Current</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">iOS • Safari</p>
                        <p className="text-xs text-text-muted">San Francisco, CA • 2 hours ago</p>
                      </div>
                      <button className="text-xs font-medium text-red-500 hover:text-red-400 transition-colors flex items-center gap-1">
                        <LogOut className="w-3 h-3" /> Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Activity Log</h3>
                <p className="text-sm text-text-muted mb-6">Recent actions performed on your account.</p>
              </div>

              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-subtle before:to-transparent">
                {[
                  { action: 'Completed task', target: 'Design System Update', time: '2 hours ago', icon: <Check className="w-4 h-4 text-green-500" /> },
                  { action: 'Commented on', target: 'User Research Findings', time: '5 hours ago', icon: <Activity className="w-4 h-4 text-blue-500" /> },
                  { action: 'Moved task', target: 'API Integration', time: '1 day ago', icon: <Activity className="w-4 h-4 text-orange-500" /> },
                  { action: 'Logged in', target: 'from new device (Mac OS)', time: '2 days ago', icon: <Shield className="w-4 h-4 text-purple-500" /> },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle bg-bg-deep shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {item.icon}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-bg-deep border border-border-subtle p-4 rounded-xl shadow">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm text-white">{item.action}</h4>
                        <time className="text-xs text-text-muted">{item.time}</time>
                      </div>
                      <p className="text-sm text-text-muted">{item.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
