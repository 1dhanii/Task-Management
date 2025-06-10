"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/lib/types"
import { TrendingUp } from "lucide-react"
import { format, subDays, isAfter, isBefore, startOfDay, endOfDay } from "date-fns"
import { id } from "date-fns/locale"

interface ProductivityChartProps {
  tasks: Task[]
}

export function ProductivityChart({ tasks }: ProductivityChartProps) {
  // Generate last 7 days data
  const getLast7DaysData = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const dayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.createdAt)
        return isAfter(taskDate, startOfDay(date)) && isBefore(taskDate, endOfDay(date))
      })
      const completedTasks = tasks.filter((task) => {
        if (!task.completed || !task.updatedAt) return false
        const taskDate = new Date(task.updatedAt)
        return isAfter(taskDate, startOfDay(date)) && isBefore(taskDate, endOfDay(date))
      })

      days.push({
        date,
        label: format(date, "EEE", { locale: id }),
        created: dayTasks.length,
        completed: completedTasks.length,
        productivity: dayTasks.length > 0 ? Math.round((completedTasks.length / dayTasks.length) * 100) : 0,
      })
    }
    return days
  }

  const weekData = getLast7DaysData()
  const maxTasks = Math.max(...weekData.map((d) => Math.max(d.created, d.completed)))

  return (
    <Card className="glass border-white/20 dark:border-black/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Produktivitas 7 Hari Terakhir
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weekData.map((day, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{day.label}</span>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Dibuat: {day.created}</span>
                  <span>Selesai: {day.completed}</span>
                  <span className="font-medium text-blue-600">{day.productivity}%</span>
                </div>
              </div>
              <div className="flex gap-2 h-6">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full transition-all duration-300"
                    style={{ width: `${maxTasks > 0 ? (day.created / maxTasks) * 100 : 0}%` }}
                  />
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${maxTasks > 0 ? (day.completed / maxTasks) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center gap-6 pt-2 border-t border-white/20 dark:border-black/20">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
              <span>Tugas Dibuat</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Tugas Selesai</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
