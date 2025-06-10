"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/lib/types"
import { Flag } from "lucide-react"

interface PriorityAnalysisProps {
  tasks: Task[]
}

export function PriorityAnalysis({ tasks }: PriorityAnalysisProps) {
  const getPriorityStats = () => {
    const priorities = [
      {
        key: "high",
        label: "Tinggi",
        icon: "🔴",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-900/20",
      },
      {
        key: "medium",
        label: "Sedang",
        icon: "🟡",
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      },
      {
        key: "low",
        label: "Rendah",
        icon: "🟢",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-900/20",
      },
    ]

    return priorities.map((priority) => {
      const priorityTasks = tasks.filter((task) => task.priority === priority.key)
      const completedTasks = priorityTasks.filter((task) => task.completed)
      const overdueTasks = priorityTasks.filter(
        (task) => task.dueDate && !task.completed && new Date(task.dueDate) < new Date(),
      )

      return {
        ...priority,
        total: priorityTasks.length,
        completed: completedTasks.length,
        overdue: overdueTasks.length,
        active: priorityTasks.length - completedTasks.length,
        completionRate: priorityTasks.length > 0 ? Math.round((completedTasks.length / priorityTasks.length) * 100) : 0,
      }
    })
  }

  const priorityStats = getPriorityStats()
  const totalTasks = tasks.length

  // Calculate average completion time by priority
  const getAverageCompletionTime = (priority: string) => {
    const completedTasks = tasks.filter((task) => task.priority === priority && task.completed && task.updatedAt)

    if (completedTasks.length === 0) return 0

    const totalTime = completedTasks.reduce((sum, task) => {
      const created = new Date(task.createdAt)
      const completed = new Date(task.updatedAt!)
      return sum + (completed.getTime() - created.getTime())
    }, 0)

    return Math.round(totalTime / completedTasks.length / (1000 * 60 * 60 * 24)) // days
  }

  return (
    <Card className="glass border-white/20 dark:border-black/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-orange-500" />
          Analisis Prioritas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {priorityStats.map((priority, index) => (
            <div key={priority.key} className={`p-4 rounded-lg ${priority.bgColor}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{priority.icon}</span>
                  <span className="font-semibold">{priority.label}</span>
                  <Badge variant="outline">{priority.total} tugas</Badge>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${priority.color}`}>{priority.completionRate}%</div>
                  <div className="text-xs text-gray-500">tingkat selesai</div>
                </div>
              </div>

              <Progress value={priority.completionRate} className="h-2 mb-3" />

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-green-600 dark:text-green-400">{priority.completed}</div>
                  <div className="text-xs text-gray-500">Selesai</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-blue-600 dark:text-blue-400">{priority.active}</div>
                  <div className="text-xs text-gray-500">Aktif</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-red-600 dark:text-red-400">{priority.overdue}</div>
                  <div className="text-xs text-gray-500">Terlambat</div>
                </div>
              </div>

              {priority.total > 0 && (
                <div className="mt-3 pt-3 border-t border-white/20 dark:border-black/20">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Rata-rata waktu penyelesaian:</span>
                    <span className="font-medium">{getAverageCompletionTime(priority.key)} hari</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
