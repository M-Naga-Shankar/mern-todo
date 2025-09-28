export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskCategory = 'personal' | 'work' | 'shopping' | 'health' | 'finance';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskFormData {
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
}