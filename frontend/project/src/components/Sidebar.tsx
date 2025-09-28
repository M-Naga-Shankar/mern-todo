import React from 'react';
import { Filter, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../utils/constants';
import { TaskCategory, TaskPriority } from '../types/Task';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: TaskCategory | 'all';
  selectedPriority: TaskPriority | 'all';
  onCategoryChange: (category: TaskCategory | 'all') => void;
  onPriorityChange: (priority: TaskPriority | 'all') => void;
  taskCounts: Record<TaskCategory, number>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  selectedPriority,
  onCategoryChange,
  onPriorityChange,
  taskCounts
}) => {
  const Icon = ({ iconName }: { iconName: string }) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:relative lg:translate-x-0 top-0 left-0 h-full z-50
        bg-gray-800 border-r border-gray-700 w-80 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-white">Filters</h2>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">
              Categories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => onCategoryChange('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg 
                           text-left transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>All Categories</span>
                <span className="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded-full">
                  {Object.values(taskCounts).reduce((sum, count) => sum + count, 0)}
                </span>
              </button>
              
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg 
                             text-left transition-all duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon iconName={category.icon} />
                    <span>{category.label}</span>
                  </div>
                  <span className="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded-full">
                    {taskCounts[category.value] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Priorities */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">
              Priority
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => onPriorityChange('all')}
                className={`w-full flex items-center px-3 py-2 rounded-lg 
                           text-left transition-all duration-200 ${
                  selectedPriority === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                All Priorities
              </button>
              
              {PRIORITIES.map((priority) => (
                <button
                  key={priority.value}
                  onClick={() => onPriorityChange(priority.value)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg 
                             text-left transition-all duration-200 ${
                    selectedPriority === priority.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${priority.bgColor.replace('bg-', 'bg-opacity-60 bg-')}`} />
                  <span className="capitalize">{priority.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;