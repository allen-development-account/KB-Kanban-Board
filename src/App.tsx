import React, { useState } from 'react';
import { AppNav } from './components/AppNav';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProjectHeader } from './components/ProjectHeader';
import { KanbanBoard } from './components/KanbanBoard';
import { PageRouter } from './components/Pages';

export default function App() {
  const [currentView, setCurrentView] = useState('Research & Development');

  return (
    <div className="flex h-screen w-full bg-bg-deep text-text-heading overflow-hidden font-sans">
      <AppNav />
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden">
          {currentView === 'Research & Development' ? (
            <>
              <ProjectHeader />
              <KanbanBoard />
            </>
          ) : (
            <PageRouter title={currentView} onBack={() => setCurrentView('Research & Development')} />
          )}
        </main>
      </div>
    </div>
  );
}
