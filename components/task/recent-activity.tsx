"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/lib/types"
import { Activity, CheckCircle2, Plus } from "lucide-react"
import { format, isToday, isYesterday } from "date-fns"
import { id } from "date-fns/locale"

interface RecentActivityProps {
  tasks: Task[]
}

export function RecentActivity({ tasks }: RecentActivityProps) {
  // Simulasi aktivitas berdasarkan task data
  const getRecentActivities = () => {
    const activities = []

    // Tugas yang baru dibuat (dalam 24 jam terakhir)
    const recentTasks = tasks
      .filter((task) => {
        const createdDate = new Date(task.createdAt)
        const now = new Date()
        const diffHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60)
        return diffHours <= 24
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Tugas yang baru diselesaikan
    const completedTasks = tasks
      .filter((task) => task.completed && task.updatedAt)
      .sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime())
      .slice(0, 3)

    // Tambahkan aktivitas tugas baru
    recentTasks.slice(0, 3).forEach((task) => {
      activities.push({
        id: `created-${task.id}`,
        type: "created",
        task,
        timestamp: new Date(task.createdAt),
        icon: Plus,
        color: "text-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/30",
      })
    })

    // Tambahkan aktivitas tugas selesai
    completedTasks.forEach((task) => {
      activities.push({
        id: `completed-${task.id}`,
        type: "completed",
        task,
        timestamp: new Date(task.updatedAt!),
        icon: CheckCircle2,
        color: "text-green-500",
        bgColor: "bg-green-50 dark:bg-green-900/30",
      })
    })

    // Urutkan berdasarkan waktu terbaru
    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5)
  }

  const activities = getRecentActivities()

  const formatTimestamp = (date: Date) => {
    if (isToday(date)) {
      return `Hari ini, ${format(date, "HH:mm")}`
    } else if (isYesterday(date)) {
      return `Kemarin, ${format(date, "HH:mm")}`
    } else {
      return format(date, "dd MMM, HH:mm", { locale: id })
    }
  }

  return (
    <Card className="glass border-white/20 dark:border-black/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-500" />
          Aktivitas Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-gray-400 dark:text-gray-600 mb-2">
              <Activity className="w-8 h-8 mx-auto" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada aktivitas terbaru</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${activity.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium truncate">{activity.task.title}</span>
                      <Badge
                        variant="outline"
                        className={
                          activity.type === "created"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        }
                      >
                        {activity.type === "created" ? "Dibuat" : "Selesai"}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatTimestamp(activity.timestamp)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
