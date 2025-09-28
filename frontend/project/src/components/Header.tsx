import React from 'react';
import { Plus, CheckSquare } from 'lucide-react';

interface HeaderProps {
  onAddTask: () => void;
  totalTasks: number;
  completedTasks: number;
}

const Header: React.FC<HeaderProps> = ({ onAddTask, totalTasks, completedTasks }) => {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
          </div>
          <div className="hidden sm:flex items-center space-x-4 ml-8">
            <div className="text-sm text-gray-300">
              <span className="font-medium text-white">{completedTasks}</span> of{' '}
              <span className="font-medium text-white">{totalTasks}</span> completed
            </div>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-300">{completionPercentage}%</span>
          </div>
        </div>
        
        <button
          onClick={onAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg 
                     flex items-center space-x-2 transition-all duration-200 ease-in-out
                     transform hover:scale-105 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>
      
      {/* Mobile progress bar */}
      <div className="sm:hidden mt-3 flex items-center space-x-3">
        <div className="text-sm text-gray-300">
          <span className="font-medium text-white">{completedTasks}</span>/{totalTasks} completed
        </div>
        <div className="flex-1 bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-300">{completionPercentage}%</span>
      </div>
    </header>
  );
};

export default Header;