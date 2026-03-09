import React from 'react';
import { MoreHorizontal, Clock, Paperclip, MessageSquare, ListTodo, CheckCircle2, User } from 'lucide-react';
import { UserPills } from './ProjectHeader';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const getColumnIcon = (id: string) => {
  if (id.startsWith('user-') || id === 'unassigned') {
    return <User className="w-3.5 h-3.5 text-text-muted" />;
  }
  switch (id) {
    case 'todo': return <ListTodo className="w-3.5 h-3.5 text-white" />;
    case 'inprogress': return <Clock className="w-3.5 h-3.5 text-yellow-400" />;
    case 'inreview': return <MessageSquare className="w-3.5 h-3.5 text-orange-400" />;
    case 'completed': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
    default: return null;
  }
};

export function KanbanColumn({ data, onCardClick, filterUser, setFilterUser }: { data: any, onCardClick: (card: any) => void, filterUser?: string | null, setFilterUser?: (user: string | null) => void }) {
  return (
    <div className="w-[280px] flex-shrink-0 flex flex-col max-h-full">
      <div className="flex items-center justify-between mb-4 bg-bg-surface border border-border-subtle rounded-lg px-3 py-2.5">
        <div className="flex items-center gap-2">
          {getColumnIcon(data.id)}
          <span className="text-[11px] font-semibold text-white tracking-wider uppercase">{data.title}</span>
        </div>
        <span className="bg-bg-card border border-border-subtle text-text-muted text-[10px] font-bold px-2 py-0.5 rounded-md">
          {data.count}
        </span>
      </div>
      
      <Droppable droppableId={data.id}>
        {(provided, snapshot) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex flex-col gap-3 overflow-y-auto pb-20 pr-1 custom-scrollbar min-h-[150px] ${snapshot.isDraggingOver ? 'bg-white/5 rounded-xl' : ''}`}
          >
            {data.cards.map((card: any, index: number) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.8 : 1,
                    }}
                  >
                    <KanbanCard card={card} isDragging={snapshot.isDragging} onClick={() => onCardClick(card)} filterUser={filterUser} setFilterUser={setFilterUser} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function KanbanCard({ card, isDragging, onClick, filterUser, setFilterUser }: { card: any, isDragging?: boolean, onClick: () => void, filterUser?: string | null, setFilterUser?: (user: string | null) => void }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-bg-card border ${isDragging ? 'border-accent shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)]' : 'border-border-subtle hover:border-border-subtle/80'} rounded-xl p-5 flex flex-col gap-3 cursor-grab active:cursor-grabbing transition-colors group`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-[14px] font-semibold text-white leading-[1.4] pr-2">{card.title}</h3>
        <button className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      {card.description && (
        <p className="text-[12px] text-text-muted leading-[1.5]">
          {card.description}
        </p>
      )}
      
      <div className="flex items-center gap-1.5 text-text-muted mt-1">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-[11px] font-medium">{card.date}</span>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <UserPills users={card.users} filterUser={filterUser} setFilterUser={setFilterUser} />
        
        <div className="flex items-center gap-3 text-text-muted">
          {card.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">{card.attachments}</span>
            </div>
          )}
          {card.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">{card.comments}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
