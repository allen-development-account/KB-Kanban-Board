import React, { useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { Plus, Check, X, Clock, Paperclip, MessageSquare, SlidersHorizontal, ArrowUpDown, LayoutGrid, Eye, UserPlus, Share2, MoreHorizontal, Edit2, Save } from 'lucide-react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { UserPills } from './ProjectHeader';

const USERS = [
  { id: 'allen', name: 'Allen (Subject Matter Expert)' },
  { id: 'ayush', name: 'Ayush (Business Analyst)' },
  { id: 'edwin', name: 'Edwin (Senior Program Manager)' }
];

const initialBoardData = [
  {
    id: 'todo',
    title: 'TO DO',
    count: 2,
    cards: [
      {
        id: 'c1',
        title: 'Market Analysis',
        description: 'Analyze competitor products and identify market gaps.',
        detailedDescription: 'Analyze competitor products and identify market gaps. We need to look at top 3 competitors, evaluate their pricing models, and understand their target demographics.\n\nDeliverables:\n- Comprehensive slide deck\n- Feature comparison matrix\n- Pricing analysis spreadsheet',
        date: '12 Oct',
        users: ['ayush'],
        attachments: 1,
        comments: 2,
      },
      {
        id: 'c2',
        title: 'Technical Feasibility',
        description: 'Evaluate tech stack options for the new architecture.',
        detailedDescription: 'Evaluate tech stack options for the new architecture. Consider React vs Vue, Node.js vs Go for the backend, and assess cloud providers (AWS vs GCP).\n\nDeliverables:\n- Architecture decision record (ADR)\n- Proof of concept repository\n- Cost estimation report',
        date: '15 Oct',
        users: ['allen', 'edwin'],
        attachments: 0,
        comments: 5,
      }
    ]
  },
  {
    id: 'inprogress',
    title: 'IN PROGRESS',
    count: 2,
    cards: [
      {
        id: 'c3',
        title: 'Prototype Development',
        description: 'Build core proof-of-concept for the new AI module.',
        detailedDescription: 'Build core proof-of-concept for the new AI module. Integrate with the OpenAI API, set up basic prompt engineering, and create a simple UI for testing.\n\nDeliverables:\n- Working prototype deployed to staging\n- API integration documentation\n- Initial user feedback report',
        date: '10 Oct',
        users: ['allen'],
        attachments: 3,
        comments: 1,
      },
      {
        id: 'c4',
        title: 'Resource Allocation',
        description: 'Finalize budget and team assignments for Q4.',
        detailedDescription: 'Finalize budget and team assignments for Q4. Review current burn rate, allocate funds for new hires, and assign developers to the R&D squad.\n\nDeliverables:\n- Approved Q4 budget spreadsheet\n- Updated team roster\n- Hiring plan for Q4',
        date: '11 Oct',
        users: ['edwin'],
        attachments: 1,
        comments: 0,
      }
    ]
  },
  {
    id: 'inreview',
    title: 'IN REVIEW',
    count: 1,
    cards: [
      {
        id: 'c5',
        title: 'Requirements Gathering',
        description: 'Compile business requirements from stakeholders.',
        detailedDescription: 'Compile business requirements from stakeholders. Interview sales, marketing, and customer success teams to understand pain points.\n\nDeliverables:\n- PRD (Product Requirements Document)\n- User personas\n- User journey maps',
        date: '05 Oct',
        users: ['ayush', 'edwin'],
        attachments: 2,
        comments: 4,
      }
    ]
  },
  {
    id: 'completed',
    title: 'COMPLETED',
    count: 1,
    cards: [
      {
        id: 'c6',
        title: 'Project Kickoff',
        description: 'Initial alignment meeting with all stakeholders.',
        detailedDescription: 'Initial alignment meeting with all stakeholders. Present the vision, timeline, and expected outcomes.\n\nDeliverables:\n- Meeting minutes\n- Recorded session\n- Kickoff slide deck',
        date: '01 Oct',
        users: ['allen', 'ayush', 'edwin'],
        attachments: 1,
        comments: 0,
      }
    ]
  }
];

export function KanbanBoard() {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignees: [] as string[] });

  // Toolbar states
  const [filterUser, setFilterUser] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'title'>('default');
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
    setEditForm(card);
    setIsEditing(false);
  };

  const handleSaveCard = () => {
    const newBoardData = boardData.map(col => ({
      ...col,
      cards: col.cards.map(c => c.id === editForm.id ? editForm : c)
    }));
    setBoardData(newBoardData);
    setSelectedCard(editForm);
    setIsEditing(false);
  };

  const toggleEditAssignee = (userId: string) => {
    setEditForm((prev: any) => ({
      ...prev,
      users: prev.users.includes(userId) 
        ? prev.users.filter((id: string) => id !== userId)
        : [...prev.users, userId]
    }));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColIndex = boardData.findIndex(col => col.id === source.droppableId);
    const destColIndex = boardData.findIndex(col => col.id === destination.droppableId);

    const newBoardData = [...boardData];
    const sourceCol = newBoardData[sourceColIndex];
    const destCol = newBoardData[destColIndex];

    const sourceCards = [...sourceCol.cards];
    const destCards = source.droppableId === destination.droppableId ? sourceCards : [...destCol.cards];

    const [movedCard] = sourceCards.splice(source.index, 1);
    destCards.splice(destination.index, 0, movedCard);

    newBoardData[sourceColIndex] = { ...sourceCol, cards: sourceCards, count: sourceCards.length };
    if (source.droppableId !== destination.droppableId) {
      newBoardData[destColIndex] = { ...destCol, cards: destCards, count: destCards.length };
    }

    setBoardData(newBoardData);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    
    const newCard = {
      id: `c${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      detailedDescription: newTask.description,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      users: newTask.assignees,
      attachments: 0,
      comments: 0,
    };

    const newBoardData = [...boardData];
    const todoColIndex = newBoardData.findIndex(col => col.id === 'todo');
    const todoCol = newBoardData[todoColIndex];
    
    newBoardData[todoColIndex] = {
      ...todoCol,
      cards: [newCard, ...todoCol.cards],
      count: todoCol.count + 1
    };

    setBoardData(newBoardData);
    setIsModalOpen(false);
    setNewTask({ title: '', description: '', assignees: [] });
  };

  const toggleAssignee = (userId: string) => {
    setNewTask(prev => ({
      ...prev,
      assignees: prev.assignees.includes(userId) 
        ? prev.assignees.filter(id => id !== userId)
        : [...prev.assignees, userId]
    }));
  };

  const getFilteredAndSortedCards = (cards: any[]) => {
    let result = [...cards];
    if (filterUser) {
      result = result.filter(c => c.users.includes(filterUser));
    }
    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex items-center justify-between border-b border-border-subtle pb-4 px-8 pt-2">
        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <ToolbarButton icon={<SlidersHorizontal />} label="Filter" onClick={() => setShowMenu(showMenu === 'filter' ? null : 'filter')} active={!!filterUser} />
            {showMenu === 'filter' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-bg-surface border border-border-subtle rounded-lg shadow-xl z-50 py-1">
                <div className="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Filter by Assignee</div>
                <button onClick={() => { setFilterUser(null); setShowMenu(null); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${!filterUser ? 'text-accent' : 'text-white'}`}>All Users</button>
                {USERS.map(u => (
                  <button key={u.id} onClick={() => { setFilterUser(u.id); setShowMenu(null); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${filterUser === u.id ? 'text-accent' : 'text-white'}`}>{u.name}</button>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <ToolbarButton icon={<ArrowUpDown />} label="Sort by" onClick={() => setShowMenu(showMenu === 'sort' ? null : 'sort')} active={sortBy !== 'default'} />
            {showMenu === 'sort' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-bg-surface border border-border-subtle rounded-lg shadow-xl z-50 py-1">
                <button onClick={() => { setSortBy('default'); setShowMenu(null); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${sortBy === 'default' ? 'text-accent' : 'text-white'}`}>Default (Manual)</button>
                <button onClick={() => { setSortBy('title'); setShowMenu(null); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${sortBy === 'title' ? 'text-accent' : 'text-white'}`}>Title (A-Z)</button>
              </div>
            )}
          </div>

          <ToolbarButton icon={<LayoutGrid />} label="Group by" onClick={() => alert('Group by functionality is active. Currently grouped by Status.')} />
          <ToolbarButton icon={<Eye />} label="Show" onClick={() => alert('Show options: All, Hide Completed (Coming soon)')} />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => alert('Add Assignee dialog opened')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle text-sm font-medium text-white hover:bg-bg-surface transition-colors">
            <UserPlus className="w-4 h-4" />
            Add Assignee
          </button>
          <button onClick={() => alert('Share dialog opened')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle text-sm font-medium text-white hover:bg-bg-surface transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button onClick={() => alert('More options opened')} className="flex items-center justify-center w-8 h-8 rounded-lg border border-border-subtle text-white hover:bg-bg-surface transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 pb-8 custom-scrollbar relative">
          <div className="flex gap-5 h-full items-start pt-4">
            {boardData.map(col => (
              <KanbanColumn 
                key={col.id} 
                data={{...col, cards: getFilteredAndSortedCards(col.cards)}} 
                onCardClick={handleCardClick} 
              />
            ))}
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-8 right-8 bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] flex items-center gap-2 transition-colors z-40"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </DragDropContext>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 w-[400px] shadow-2xl">
            <h2 className="text-lg font-semibold text-white mb-4">Add New Task</h2>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Title</label>
                <input 
                  type="text" 
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-bg-deep border border-border-subtle rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="Task title"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Description</label>
                <textarea 
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                  className="w-full bg-bg-deep border border-border-subtle rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent transition-colors resize-none h-24"
                  placeholder="Brief description..."
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-text-muted mb-2">Assignees</label>
                <div className="flex flex-col gap-2">
                  {USERS.map(u => (
                    <label key={u.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${newTask.assignees.includes(u.id) ? 'bg-accent border-accent' : 'border-border-subtle group-hover:border-text-muted'}`}>
                        {newTask.assignees.includes(u.id) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-bg-surface border border-border-subtle flex items-center justify-center text-[10px] font-bold text-white">
                        {u.name.charAt(0)}
                      </div>
                      <span className="text-sm text-text-muted group-hover:text-white transition-colors">{u.name}</span>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={newTask.assignees.includes(u.id)}
                        onChange={() => toggleAssignee(u.id)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border-subtle">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTask}
                disabled={!newTask.title.trim()}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCard && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-bg-surface border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-start justify-between p-6 border-b border-border-subtle">
              <div className="flex flex-col gap-2 w-full pr-4">
                <div className="flex items-center gap-3">
                  <span className="bg-bg-card border border-border-subtle text-text-muted text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {boardData.find(col => col.cards.some(c => c.id === selectedCard.id))?.title || 'Unknown'}
                  </span>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">{selectedCard.date}</span>
                  </div>
                </div>
                {isEditing ? (
                  <input 
                    type="text"
                    value={editForm.title}
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                    className="text-xl font-semibold text-white bg-bg-deep border border-border-subtle rounded px-2 py-1 w-full focus:outline-none focus:border-accent"
                  />
                ) : (
                  <h2 className="text-xl font-semibold text-white">{selectedCard.title}</h2>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <button 
                    onClick={handleSaveCard}
                    className="flex items-center gap-1 px-3 py-1.5 bg-accent hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-border-subtle hover:bg-white/5 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => setSelectedCard(null)}
                  className="text-text-muted hover:text-white transition-colors p-1 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Description</h3>
                {isEditing ? (
                  <textarea 
                    value={editForm.detailedDescription || editForm.description}
                    onChange={e => setEditForm({...editForm, detailedDescription: e.target.value, description: e.target.value.split('\n')[0]})}
                    className="w-full h-32 text-sm text-white bg-bg-deep border border-border-subtle rounded-lg p-4 focus:outline-none focus:border-accent resize-none"
                  />
                ) : (
                  <div className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap bg-bg-card border border-border-subtle rounded-lg p-4">
                    {selectedCard.detailedDescription || selectedCard.description || 'No description provided.'}
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Assignees</h3>
                <div className="bg-bg-card border border-border-subtle rounded-lg p-4">
                  {isEditing ? (
                    <div className="flex flex-col gap-2">
                      {USERS.map(u => (
                        <label key={u.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${editForm.users.includes(u.id) ? 'bg-accent border-accent' : 'border-border-subtle group-hover:border-text-muted'}`}>
                            {editForm.users.includes(u.id) && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm text-text-muted group-hover:text-white transition-colors">{u.name}</span>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={editForm.users.includes(u.id)}
                            onChange={() => toggleEditAssignee(u.id)}
                          />
                        </label>
                      ))}
                    </div>
                  ) : (
                    selectedCard.users && selectedCard.users.length > 0 ? (
                      <UserPills users={selectedCard.users} />
                    ) : (
                      <span className="text-sm text-text-muted">Unassigned</span>
                    )
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-6 border-t border-border-subtle pt-6">
                <div className="flex items-center gap-2 text-text-muted">
                  <Paperclip className="w-4 h-4" />
                  <span className="text-sm font-medium">{selectedCard.attachments} Attachments</span>
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">{selectedCard.comments} Comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarButton({ icon, label, onClick, active }: { icon: React.ReactNode, label: string, onClick?: () => void, active?: boolean }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 text-sm font-medium transition-colors ${active ? 'text-accent' : 'text-text-muted hover:text-white'}`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
      {label}
    </button>
  );
}
