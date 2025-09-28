import React, { useState } from 'react';
import { Calendar, CreditCard as Edit3, Trash2, MoreVertical } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Task } from '../types/Task';
import { CATEGORIES, PRIORITIES, formatDate, isOverdue, isDueSoon } from '../utils/constants';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  
  const category = CATEGORIES.find(cat => cat.value === task.category);
  const priority = PRIORITIES.find(pri => pri.value === task.priority);
  
  const Icon = ({ iconName }: { iconName: string }) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    return <IconComponent className="h-4 w-4" />;
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    if (isOverdue(task.dueDate) && !task.completed) return 'overdue';
    if (isDueSoon(task.dueDate) && !task.completed) return 'due-soon';
    return 'normal';
  };

  const dueDateStatus = getDueDateStatus();

  return (
    <div className={`
      bg-gray-800 border border-gray-700 rounded-xl p-4 transition-all duration-200
      hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/10 group
      ${task.completed ? 'opacity-75' : ''}
    `}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`
              mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-all duration-200 hover:scale-110 ${
              task.completed
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-gray-500 hover:border-blue-400'
            }`}
          >
            {task.completed && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-medium text-white mb-1 transition-all duration-200 ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`
                text-sm text-gray-400 mb-3 ${
                task.completed ? 'line-through' : ''
              }`}>
                {task.description}
              </p>
            )}
            
            {/* Task Meta */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Category */}
              {category && (
                <div className="flex items-center space-x-1 text-xs">
                  <Icon iconName={category.icon} />
                  <span className={`${category.color} font-medium`}>
                    {category.label}
                  </span>
                </div>
              )}
              
              {/* Priority */}
              {priority && (
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${priority.color} ${priority.bgColor}
                `}>
                  {priority.label}
                </span>
              )}
              
              {/* Due Date */}
              {task.dueDate && (
                <div className={`
                  flex items-center space-x-1 text-xs px-2 py-1 rounded-full
                  ${dueDateStatus === 'overdue' ? 'text-red-300 bg-red-900' :
                    dueDateStatus === 'due-soon' ? 'text-yellow-300 bg-yellow-900' :
                    'text-gray-300 bg-gray-700'
                  }
                `}>
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 top-8 bg-gray-700 border border-gray-600 rounded-lg py-1 z-10 min-w-[120px]">
              <button
                onClick={() => {
                  onEdit(task);
                  setShowActions(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-600 hover:text-white flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowActions(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-600 hover:text-red-400 flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;