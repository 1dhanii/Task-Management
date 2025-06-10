"use client"

import type { Task, Category } from "@/lib/types"
import { TaskCard } from "./task-card"
import { EmptyState } from "@/components/common/empty-state"
import { Sparkles } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
  categories: Category[]
  selectedTasks: string[]
  onToggle: (id: string) => void
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
  onSelectTask: (taskId: string, selected: boolean) => void
}

export function TaskList({
  tasks,
  categories,
  selectedTasks,
  onToggle,
  onUpdate,
  onDelete,
  onDuplicate,
  onSelectTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="glass rounded-2xl border-white/20 dark:border-black/20">
        <EmptyState
          title="Belum ada tugas"
          description="Mulai produktivitas Anda dengan menambahkan tugas pertama!"
          actionLabel="Tambah Tugas Pertama"
          icon={<Sparkles className="w-16 h-16" />}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          categories={categories}
          isSelected={selectedTasks.includes(task.id)}
          onToggle={() => onToggle(task.id)}
          onUpdate={(updates) => onUpdate(task.id, updates)}
          onDelete={() => onDelete(task.id)}
          onDuplicate={() => onDuplicate(task.id)}
          onSelect={(selected) => onSelectTask(task.id, selected)}
        />
      ))}
    </div>
  )
}
