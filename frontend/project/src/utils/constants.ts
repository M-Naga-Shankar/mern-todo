import { TaskCategory, TaskPriority } from '../types/Task';

export const CATEGORIES: { value: TaskCategory; label: string; icon: string; color: string }[] = [
  { value: 'personal', label: 'Personal', icon: 'User', color: 'text-blue-400' },
  { value: 'work', label: 'Work', icon: 'Briefcase', color: 'text-purple-400' },
  { value: 'shopping', label: 'Shopping', icon: 'ShoppingCart', color: 'text-green-400' },
  { value: 'health', label: 'Health', icon: 'Heart', color: 'text-red-400' },
  { value: 'finance', label: 'Finance', icon: 'DollarSign', color: 'text-yellow-400' }
];

export const PRIORITIES: { value: TaskPriority; label: string; color: string; bgColor: string }[] = [
  { value: 'low', label: 'Low', color: 'text-gray-300', bgColor: 'bg-gray-700' },
  { value: 'medium', label: 'Medium', color: 'text-blue-300', bgColor: 'bg-blue-900' },
  { value: 'high', label: 'High', color: 'text-orange-300', bgColor: 'bg-orange-900' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-300', bgColor: 'bg-red-900' }
];

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const isOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date();
};

export const isDueSoon = (dueDate: string): boolean => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 3 && diffDays >= 0;
};