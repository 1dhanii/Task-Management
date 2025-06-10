export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate: string
  createdAt: string
  updatedAt: string
  category: string
  progress: number
  tags: string[]
  reminder: boolean
  reminderDate?: string
  estimatedTime?: number
  actualTime?: number
  subtasks: SubTask[]
}

export interface SubTask {
  id: string
  title: string
  completed: boolean
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export interface TaskStats {
  total: number
  completed: number
  overdue: number
  upcoming: number
  highPriority: number
  completionRate: number
  averageCompletionTime: number
}

export interface FilterOptions {
  status: "all" | "active" | "completed"
  category: string
  priority: string
  dateRange: {
    start?: string
    end?: string
  }
}

export interface SortOptions {
  field: "title" | "dueDate" | "priority" | "createdAt" | "progress"
  direction: "asc" | "desc"
}
