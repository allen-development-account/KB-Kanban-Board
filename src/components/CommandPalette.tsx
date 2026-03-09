import React, { useState, useEffect } from 'react';
import { Search, FileText, CheckSquare, User } from 'lucide-react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const results = [
    { icon: <CheckSquare className="w-4 h-4" />, title: 'Market Analysis', type: 'Task' },
    { icon: <CheckSquare className="w-4 h-4" />, title: 'Technical Feasibility', type: 'Task' },
    { icon: <CheckSquare className="w-4 h-4" />, title: 'Prototype Development', type: 'Task' },
    { icon: <FileText className="w-4 h-4" />, title: 'Q4_Budget.xlsx', type: 'File' },
    { icon: <FileText className="w-4 h-4" />, title: 'Architecture_Diagram.png', type: 'File' },
    { icon: <User className="w-4 h-4" />, title: 'Allen (Subject Matter Expert)', type: 'Person' },
    { icon: <User className="w-4 h-4" />, title: 'Ayush (Business Analyst)', type: 'Person' },
    { icon: <User className="w-4 h-4" />, title: 'Edwin (Senior Program Manager)', type: 'Person' },
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-start justify-center pt-[20vh]">
      <div className="bg-bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center px-4 py-3 border-b border-border-subtle">
          <Search className="w-5 h-5 text-text-muted mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search tasks, files, people... (Type to search)"
            className="flex-1 bg-transparent text-white focus:outline-none text-lg"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="text-xs text-text-muted bg-bg-deep px-2 py-1 rounded border border-border-subtle">ESC</div>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length > 0 ? results.map((r, i) => (
            <div key={i} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer text-white transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-text-muted">{r.icon}</div>
                <span>{r.title}</span>
              </div>
              <span className="text-xs text-text-muted">{r.type}</span>
            </div>
          )) : (
            <div className="p-4 text-center text-text-muted">No results found for "{query}"</div>
          )}
        </div>
      </div>
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)}></div>
    </div>
  );
}
