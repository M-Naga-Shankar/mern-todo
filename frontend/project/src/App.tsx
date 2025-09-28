import React, { useState, useMemo, useEffect } from 'react';
import { Task, TaskFormData, TaskCategory, TaskPriority } from './types/Task';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import axios from 'axios';

const gettasks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/todos');
    console.log('Fetched tasks:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};  

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  // ✅ fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await gettasks();
      setTasks(data.reverse());
    };
    fetchTasks();
  }, []);
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

  const handleEditTask =(task: Task) => {

    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = (formData: TaskFormData) => {
    const now = new Date().toISOString();
    
    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task._id === editingTask._id 
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

  const handleToggleComplete = async(id: string) => {
    await axios.patch(`http://localhost:5000/api/todos/${id}/toggle`)
      .then(() => {
        console.log('Task toggled:', id);
      } )
      .catch(error => {
        console.error('Error toggling task:', error);
      });

    setTasks(prev => prev.map(task => 
      task._id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            updatedAt: new Date().toISOString()
          }
        : task
    ));
  };

  const handleDeleteTask =  async (id: string) => {

        await axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTasks(prev => prev.filter(task => task._id !== id));
        console.log('Task deleted:', id);
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
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