import React, { useState, useEffect } from 'react';
import { X, Calendar, Flag, Tag, FileText } from 'lucide-react';

import { Task, TaskFormData } from '../types/Task';
import { CATEGORIES, PRIORITIES } from '../utils/constants';
import axios from 'axios';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  editingTask?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onSave, editingTask }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    desc: '',
    priority: 'medium',
    due_Date: '',
    category: 'personal'
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        desc: editingTask.desc || '',
        priority: editingTask.priority,
        due_Date: editingTask.due_Date || '',
        category: editingTask.category
      });
    } else {
      setFormData({
        title: '',
        desc: '',
        priority: 'medium',
        due_Date: '',
        category: 'personal'
      });
    }
  }, [editingTask, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!editingTask){
    console.log('Submitting form with data:', formData);
    if (formData.title.trim()) {
      await axios.post('http://localhost:5000/api/todos', formData)
        .then(response => {
          onSave(response.data);
          console.log('Task saved:', response.data);
          
        })
        .catch(error => {
          console.error('Error saving task:', error);
        });
      onClose();
    }}
    else{
      await axios.put(`http://localhost:5000/api/todos/${editingTask._id}`, formData)
        .then(response => {
          onSave(response.data);
          console.log('Task updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating task:', error);
        });
      onClose();
    } 
  };

  const handleChange = (field: keyof TaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {editingTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Title *</span>
              </div>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 
                         text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 
                         focus:ring-1 focus:ring-blue-400 transition-all duration-200"
              required
            />
          </div>

          {/* desc */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              desc
            </label>
            <textarea
              value={formData.desc}
              onChange={(e) => handleChange('desc', e.target.value)}
              placeholder="Add a desc..."
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 
                         text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 
                         focus:ring-1 focus:ring-blue-400 transition-all duration-200 resize-none"
           required />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span>Category</span>
              </div>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 
                         text-white focus:outline-none focus:border-blue-400 
                         focus:ring-1 focus:ring-blue-400 transition-all duration-200"
            >
              {CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Flag className="h-4 w-4" />
                <span>Priority</span>
              </div>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRIORITIES.map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => handleChange('priority', priority.value)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    flex items-center justify-center space-x-2 ${
                    formData.priority === priority.value
                      ? `${priority.color} ${priority.bgColor} ring-2 ring-blue-400`
                      : 'text-gray-400 bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    formData.priority === priority.value 
                      ? priority.bgColor.replace('bg-', 'bg-opacity-60 bg-')
                      : 'bg-gray-500'
                  }`} />
                  <span className="capitalize">{priority.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Due Date</span>
              </div>
            </label>
            <input
              type="date"
              value={formData.due_Date}
              onChange={(e) => handleChange('due_Date', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 
                         text-white focus:outline-none focus:border-blue-400 
                         focus:ring-1 focus:ring-blue-400 transition-all duration-200"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg 
                         hover:bg-gray-600 hover:text-white transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.title.trim()}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200 font-medium"
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;