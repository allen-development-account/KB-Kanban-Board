import React from 'react';
import { ArrowLeft, Users, Settings, Activity, ListTodo, CheckSquare, BarChart2, Map, MessageSquare, Package, Info, Plus, FileText, Download, Link as LinkIcon, Clock, MoreHorizontal } from 'lucide-react';
import { UserPills } from './ProjectHeader';

export function PageRouter({ title, onBack }: { title: string, onBack: () => void }) {
  const renderContent = () => {
    switch (title) {
      case 'About': return <AboutPage />;
      case 'Members': return <MembersPage />;
      case 'Project Settings': return <SettingsPage />;
      case 'Activities': return <ActivitiesPage />;
      case 'Backlog': return <BacklogPage />;
      case 'My Tasks': return <MyTasksPage />;
      case 'Reports': return <ReportsPage />;
      case 'Roadmap': return <RoadmapPage />;
      case 'Project Discussion': return <DiscussionPage />;
      case 'Resources': return <ResourcesPage />;
      default: return <GenericPage title={title} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scrollbar">
      <button onClick={onBack} className="flex items-center gap-2 text-text-muted hover:text-white mb-6 w-fit transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to previous screen
      </button>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
      </div>
      {renderContent()}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Project Overview</h2>
        <p className="text-text-muted leading-relaxed mb-6">
          The Research & Development project focuses on exploring new technologies, evaluating market trends, and developing prototypes for our next-generation AI modules. Our goal is to stay ahead of the curve and deliver innovative solutions that drive business growth.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-bg-deep rounded-lg p-4 border border-border-subtle">
            <div className="text-sm text-text-muted mb-1">Status</div>
            <div className="text-lg font-semibold text-emerald-400">On Track</div>
          </div>
          <div className="bg-bg-deep rounded-lg p-4 border border-border-subtle">
            <div className="text-sm text-text-muted mb-1">Start Date</div>
            <div className="text-lg font-semibold text-white">20 Sep 2021</div>
          </div>
          <div className="bg-bg-deep rounded-lg p-4 border border-border-subtle">
            <div className="text-sm text-text-muted mb-1">Target End Date</div>
            <div className="text-lg font-semibold text-white">31 Dec 2021</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MembersPage() {
  const members = [
    { id: 'allen', name: 'Allen', role: 'Subject Matter Expert', email: 'allen@iopex.com' },
    { id: 'ayush', name: 'Ayush', role: 'Business Analyst', email: 'ayush@iopex.com' },
    { id: 'edwin', name: 'Edwin', role: 'Senior Program Manager', email: 'edwin@iopex.com' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <p className="text-text-muted">Manage team members and their roles.</p>
        <button className="flex items-center gap-2 bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>
      <div className="bg-bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle bg-bg-deep/50">
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={i} className="border-b border-border-subtle last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <UserPills users={[m.id]} />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">{m.role}</td>
                <td className="px-6 py-4 text-sm text-text-muted">{m.email}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-muted hover:text-white p-1 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Project Name</label>
          <input type="text" defaultValue="Research & Development" className="w-full bg-bg-deep border border-border-subtle rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Description</label>
          <textarea defaultValue="Exploring new technologies and evaluating market trends." className="w-full bg-bg-deep border border-border-subtle rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors h-24 resize-none" />
        </div>
        <div className="pt-4 border-t border-border-subtle">
          <h3 className="text-sm font-semibold text-white mb-4">Visibility</h3>
          <div className="flex items-center gap-3 mb-2">
            <input type="radio" name="visibility" id="public" className="accent-accent" />
            <label htmlFor="public" className="text-sm text-white">Public to Organization</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="radio" name="visibility" id="private" defaultChecked className="accent-accent" />
            <label htmlFor="private" className="text-sm text-white">Private (Only members)</label>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button className="bg-accent hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivitiesPage() {
  const activities = [
    { user: 'allen', action: 'moved task "Prototype Development" to IN PROGRESS', time: '2 hours ago' },
    { user: 'ayush', action: 'commented on "Market Analysis"', time: '5 hours ago' },
    { user: 'edwin', action: 'created task "Resource Allocation"', time: '1 day ago' },
    { user: 'allen', action: 'attached a file to "Technical Feasibility"', time: '2 days ago' },
  ];

  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      {activities.map((act, i) => (
        <div key={i} className="bg-bg-surface border border-border-subtle rounded-xl p-4 flex items-start gap-4">
          <div className="mt-1">
            <UserPills users={[act.user]} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-white">
              <span className="font-semibold capitalize">{act.user}</span> {act.action}
            </p>
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <Clock className="w-3 h-3" />
              {act.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BacklogPage() {
  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <div className="flex justify-between items-center mb-2">
        <p className="text-text-muted">Tasks waiting to be prioritized.</p>
        <button className="flex items-center gap-2 bg-bg-surface border border-border-subtle hover:bg-white/5 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add to Backlog
        </button>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-bg-surface border border-border-subtle rounded-xl p-4 flex items-center justify-between hover:border-text-muted transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <ListTodo className="w-5 h-5 text-text-muted" />
            <span className="text-sm font-medium text-white">Future task idea #{i}</span>
          </div>
          <span className="text-xs font-medium text-text-muted bg-bg-deep px-2 py-1 rounded border border-border-subtle">Unassigned</span>
        </div>
      ))}
    </div>
  );
}

function MyTasksPage() {
  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <p className="text-text-muted mb-2">Tasks assigned to you across this project.</p>
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 flex items-center justify-between hover:border-text-muted transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          <CheckSquare className="w-5 h-5 text-accent" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Review Q4 Budget</span>
            <span className="text-xs text-text-muted">Due Tomorrow</span>
          </div>
        </div>
        <span className="text-xs font-medium text-orange-400 bg-orange-400/10 px-2 py-1 rounded border border-orange-400/20">High Priority</span>
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-muted mb-2">Total Tasks</h3>
          <div className="text-3xl font-bold text-white">24</div>
        </div>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-muted mb-2">Completed</h3>
          <div className="text-3xl font-bold text-emerald-400">12</div>
        </div>
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-muted mb-2">Overdue</h3>
          <div className="text-3xl font-bold text-pink-400">3</div>
        </div>
      </div>
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <BarChart2 className="w-8 h-8 opacity-50" />
          <p>Chart visualization placeholder</p>
        </div>
      </div>
    </div>
  );
}

function RoadmapPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex border-b border-border-subtle pb-2 mb-4">
            <div className="w-1/4 text-xs font-semibold text-text-muted uppercase">Q3 2021</div>
            <div className="w-1/4 text-xs font-semibold text-text-muted uppercase">Q4 2021</div>
            <div className="w-1/4 text-xs font-semibold text-text-muted uppercase">Q1 2022</div>
            <div className="w-1/4 text-xs font-semibold text-text-muted uppercase">Q2 2022</div>
          </div>
          <div className="relative h-32">
            <div className="absolute top-2 left-0 w-1/3 bg-blue-500/20 border border-blue-500/50 rounded-lg p-2 text-xs text-blue-200">Phase 1: Research</div>
            <div className="absolute top-12 left-[25%] w-1/2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-2 text-xs text-emerald-200">Phase 2: Prototyping</div>
            <div className="absolute top-22 left-[60%] w-1/3 bg-purple-500/20 border border-purple-500/50 rounded-lg p-2 text-xs text-purple-200">Phase 3: Launch</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscussionPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl bg-bg-surface border border-border-subtle rounded-xl overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
        <div className="flex gap-4">
          <UserPills users={['allen']} />
          <div className="bg-bg-deep border border-border-subtle rounded-2xl rounded-tl-none p-3 text-sm text-white max-w-md">
            Hey team, I've just uploaded the initial findings for the market analysis. Let me know your thoughts!
          </div>
        </div>
        <div className="flex gap-4 flex-row-reverse">
          <UserPills users={['ayush']} />
          <div className="bg-accent text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-md">
            Looks great Allen. I'll review it by end of day and add my comments.
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border-subtle bg-bg-deep flex gap-3">
        <input type="text" placeholder="Type a message..." className="flex-1 bg-bg-surface border border-border-subtle rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-accent transition-colors" />
        <button className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Send
        </button>
      </div>
    </div>
  );
}

function ResourcesPage() {
  const files = [
    { name: 'Market_Analysis_Q3.pdf', size: '2.4 MB', date: '12 Oct 2021' },
    { name: 'Architecture_Diagram.png', size: '1.1 MB', date: '10 Oct 2021' },
    { name: 'Budget_Draft_v2.xlsx', size: '450 KB', date: '08 Oct 2021' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <p className="text-text-muted">Important files and links for this project.</p>
        <button className="flex items-center gap-2 bg-bg-surface border border-border-subtle hover:bg-white/5 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Upload File
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {files.map((f, i) => (
          <div key={i} className="bg-bg-surface border border-border-subtle rounded-xl p-4 flex items-start justify-between group hover:border-text-muted transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-bg-deep rounded-lg">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white group-hover:text-accent transition-colors cursor-pointer">{f.name}</span>
                <span className="text-xs text-text-muted">{f.size} • {f.date}</span>
              </div>
            </div>
            <button className="text-text-muted hover:text-white p-1 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericPage({ title }: { title: string }) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 text-text-muted max-w-4xl">
      This is the {title} page. Content and settings for this section will be displayed here.
    </div>
  );
}
