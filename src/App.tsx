import React, { useState } from 'react';
import { AppNav } from './components/AppNav';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProjectHeader } from './components/ProjectHeader';
import { KanbanBoard } from './components/KanbanBoard';
import { PageRouter } from './components/Pages';
import { CommandPalette } from './components/CommandPalette';

export default function App() {
  const [currentView, setCurrentView] = useState('Research & Development');
  const [filterUser, setFilterUser] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-full bg-bg-deep text-text-heading overflow-hidden font-sans">
      <CommandPalette />
      <AppNav />
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden">
          {currentView === 'Research & Development' ? (
            <>
              <ProjectHeader filterUser={filterUser} setFilterUser={setFilterUser} />
              <KanbanBoard filterUser={filterUser} setFilterUser={setFilterUser} />
            </>
          ) : (
            <PageRouter title={currentView} onBack={() => setCurrentView('Research & Development')} />
          )}
        </main>
      </div>
    </div>
  );
}
