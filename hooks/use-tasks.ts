"use client"

import { useState, useCallback } from "react"
import type { Task, TaskStats, FilterOptions, SortOptions } from "@/lib/types"
import { useLocalStorage } from "./use-local-storage"
import { useNotifications } from "./use-notifications"
import { toast } from "@/hooks/use-toast"

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
  const [filter, setFilter] = useState<FilterOptions>({
    status: "all",
    category: "all",
    priority: "all",
    dateRange: {},
  })
  const [sort, setSort] = useState<SortOptions>({
    field: "dueDate",
    direction: "asc",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const { scheduleNotification, cancelNotification } = useNotifications()

  const addTask = useCallback(
    (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "subtasks">) => {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        subtasks: [],
      }

      setTasks((prev) => [...prev, newTask])

      if (newTask.reminder && newTask.reminderDate) {
        scheduleNotification(newTask.id, newTask.title, new Date(newTask.reminderDate))
      }

      toast({
        title: "✨ Tugas berhasil ditambahkan!",
        description: `"${newTask.title}" telah ditambahkan ke daftar tugas`,
      })

      return newTask
    },
    [setTasks, scheduleNotification],
  )

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            const updatedTask = {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString(),
            }

            // Handle reminder updates
            if (updates.reminder !== undefined || updates.reminderDate !== undefined) {
              cancelNotification(id)
              if (updatedTask.reminder && updatedTask.reminderDate) {
                scheduleNotification(id, updatedTask.title, new Date(updatedTask.reminderDate))
              }
            }

            return updatedTask
          }
          return task
        }),
      )

      toast({
        title: "📝 Tugas berhasil diperbarui!",
        description: "Perubahan telah disimpan",
      })
    },
    [setTasks, scheduleNotification, cancelNotification],
  )

  const deleteTask = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id)
      if (!task) return

      setTasks((prev) => prev.filter((t) => t.id !== id))
      cancelNotification(id)

      toast({
        title: "🗑️ Tugas berhasil dihapus!",
        description: `"${task.title}" telah dihapus dari daftar`,
      })

      return task
    },
    [tasks, setTasks, cancelNotification],
  )

  const toggleTask = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id)
      if (!task) return

      const completed = !task.completed
      updateTask(id, {
        completed,
        progress: completed ? 100 : task.progress,
      })

      if (completed) {
        toast({
          title: "🎉 Selamat!",
          description: `Tugas "${task.title}" telah diselesaikan!`,
        })
      }
    },
    [tasks, updateTask],
  )

  const duplicateTask = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id)
      if (!task) return

      const duplicatedTask = {
        ...task,
        title: `${task.title} (Copy)`,
        completed: false,
        progress: 0,
        reminder: false,
        reminderDate: undefined,
      }

      delete (duplicatedTask as any).id
      delete (duplicatedTask as any).createdAt
      delete (duplicatedTask as any).updatedAt
      delete (duplicatedTask as any).subtasks

      return addTask(duplicatedTask)
    },
    [tasks, addTask],
  )

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      // Status filter
      if (filter.status === "active" && task.completed) return false
      if (filter.status === "completed" && !task.completed) return false

      // Category filter
      if (filter.category !== "all" && task.category !== filter.category) return false

      // Priority filter
      if (filter.priority !== "all" && task.priority !== filter.priority) return false

      // Date range filter
      if (filter.dateRange.start && task.dueDate) {
        if (new Date(task.dueDate) < new Date(filter.dateRange.start)) return false
      }
      if (filter.dateRange.end && task.dueDate) {
        if (new Date(task.dueDate) > new Date(filter.dateRange.end)) return false
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.tags.some((tag) => tag.toLowerCase().includes(query))
        )
      }

      return true
    })
    .sort((a, b) => {
      const direction = sort.direction === "asc" ? 1 : -1

      switch (sort.field) {
        case "title":
          return a.title.localeCompare(b.title) * direction
        case "dueDate":
          if (!a.dueDate) return direction
          if (!b.dueDate) return -direction
          return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * direction
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction
        case "progress":
          return (a.progress - b.progress) * direction
        case "createdAt":
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * direction
        default:
          return 0
      }
    })

  // Calculate statistics
  const stats: TaskStats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    overdue: tasks.filter(
      (task) =>
        task.dueDate && !task.completed && new Date(task.dueDate) < new Date() && !isToday(new Date(task.dueDate)),
    ).length,
    upcoming: tasks.filter((task) => task.dueDate && !task.completed && new Date(task.dueDate) > new Date()).length,
    highPriority: tasks.filter((task) => task.priority === "high" && !task.completed).length,
    completionRate:
      tasks.length > 0 ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100) : 0,
    averageCompletionTime: 0, // Calculate based on actual implementation
  }

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    stats,
    filter,
    sort,
    searchQuery,
    setFilter,
    setSort,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    duplicateTask,
  }
}

function isToday(date: Date): boolean {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}
