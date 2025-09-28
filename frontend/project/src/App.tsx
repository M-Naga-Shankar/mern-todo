import React, { useState, useMemo } from 'react';
import { Task, TaskFormData, TaskCategory, TaskPriority } from './types/Task';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finalize the Q1 project proposal and send to stakeholders',
      category: 'work',
      priority: 'high',
      dueDate: '2025-01-25',
      completed: false,
      createdAt: '2025-01-15T10:00:00Z',
      updatedAt: '2025-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Grocery shopping',
      description: 'Buy vegetables, fruits, and dairy products',
      category: 'shopping',
      priority: 'medium',
      dueDate: '2025-01-20',
      completed: true,
      createdAt: '2025-01-14T09:30:00Z',
      updatedAt: '2025-01-19T14:20:00Z'
    },
    {
      id: '3',
      title: 'Schedule dental appointment',
      category: 'health',
      priority: 'low',
      dueDate: '2025-01-30',
      completed: false,
      createdAt: '2025-01-13T16:45:00Z',
      updatedAt: '2025-01-13T16:45:00Z'
    },
    {
      id: '4',
      title: 'Review monthly budget',
      description: 'Analyze expenses and adjust budget for next month',
      category: 'finance',
      priority: 'urgent',
      dueDate: '2025-01-18',
      completed: false,
      createdAt: '2025-01-12T11:15:00Z',
      updatedAt: '2025-01-12T11:15:00Z'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  // Filter tasks based on selected category and priority
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const categoryMatch = selectedCategory === 'all' || task.category === selectedCategory;
      const priorityMatch = selectedPriority === 'all' || task.priority === selectedPriority;
      return categoryMatch && priorityMatch;
    });
  }, [tasks, selectedCategory, selectedPriority]);

  // Calculate task counts for sidebar
  const taskCounts = useMemo(() => {
    const counts: Record<TaskCategory, number> = {
      personal: 0,
      work: 0,
      shopping: 0,
      health: 0,
      finance: 0
    };
    
    tasks.forEach(task => {
      counts[task.category]++;
    });
    
    return counts;
  }, [tasks]);

  const completedTasksCount = tasks.filter(task => task.completed).length;

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = (formData: TaskFormData) => {
    const now = new Date().toISOString();
    
    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? {
              ...task,
              ...formData,
              updatedAt: now
            }
          : task
      ));
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        ...formData,
        completed: false,
        createdAt: now,
        updatedAt: now
      };
      setTasks(prev => [newTask, ...prev]);
    }
    
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            updatedAt: new Date().toISOString()
          }
        : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleCategoryChange = (category: TaskCategory | 'all') => {
    setSelectedCategory(category);
  };

  const handlePriorityChange = (priority: TaskPriority | 'all') => {
    setSelectedPriority(priority);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        onAddTask={handleAddTask}
        totalTasks={tasks.length}
        completedTasks={completedTasksCount}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedCategory={selectedCategory}
          selectedPriority={selectedPriority}
          onCategoryChange={handleCategoryChange}
          onPriorityChange={handlePriorityChange}
          taskCounts={taskCounts}
        />
        
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleSidebar={() => setSidebarOpen(true)}
          showCompleted={showCompleted}
          onToggleShowCompleted={() => setShowCompleted(!showCompleted)}
        />
      </div>
      
      <TaskForm
        isOpen={showTaskForm}
        onClose={() => {
          setShowTaskForm(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default App;