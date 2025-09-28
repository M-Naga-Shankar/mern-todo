import React from 'react';
import { CheckCircle, Circle, Filter } from 'lucide-react';
import { Task } from '../types/Task';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleSidebar: () => void;
  showCompleted: boolean;
  onToggleShowCompleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onToggleSidebar,
  showCompleted,
  onToggleShowCompleted
}) => {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  const displayTasks = showCompleted ? tasks : activeTasks;

  if (tasks.length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Tasks</h2>
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-800 rounded-full p-6 mb-4">
            <CheckCircle className="h-12 w-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks yet</h3>
          <p className="text-gray-500 mb-6">Create your first task to get started on your productivity journey.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {showCompleted ? 'All Tasks' : 'Active Tasks'}
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleShowCompleted}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
              ${showCompleted 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }
            `}
          >
            {showCompleted ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            <span>{showCompleted ? 'Show Active' : 'Show All'}</span>
          </button>
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {!showCompleted && completedTasks.length > 0 && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400">
            {completedTasks.length} completed task{completedTasks.length !== 1 ? 's' : ''} hidden.{' '}
            <button
              onClick={onToggleShowCompleted}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Show all tasks
            </button>
          </p>
        </div>
      )}

      <div className="space-y-3">
        {displayTasks.map((task, index) => (
          <div
            key={task.id}
            className="animate-in slide-in-from-bottom-4 duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      {displayTasks.length === 0 && showCompleted && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-800 rounded-full p-6 mb-4">
            <CheckCircle className="h-12 w-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks match your filters</h3>
          <p className="text-gray-500 mb-6">Try adjusting your category or priority filters.</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;