"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/lib/types"
import { CheckCircle2, Clock, AlertTriangle, Calendar } from "lucide-react"
import { isToday, isTomorrow, isThisWeek } from "date-fns"

interface TaskSummaryProps {
  tasks: Task[]
}

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const todayTasks = tasks.filter((task) => task.dueDate && isToday(new Date(task.dueDate)) && !task.completed)
  const tomorrowTasks = tasks.filter((task) => task.dueDate && isTomorrow(new Date(task.dueDate)) && !task.completed)
  const thisWeekTasks = tasks.filter((task) => task.dueDate && isThisWeek(new Date(task.dueDate)) && !task.completed)
  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate && new Date(task.dueDate) < new Date() && !task.completed && !isToday(new Date(task.dueDate)),
  )

  const completedToday = tasks.filter((task) => task.completed && isToday(new Date(task.updatedAt || task.createdAt)))
  const totalProgress =
    tasks.length > 0 ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100) : 0

  return (
    <Card className="glass border-white/20 dark:border-black/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Ringkasan Hari Ini
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Keseluruhan */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Progress Keseluruhan</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>

        {/* Tugas Hari Ini */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Hari Ini</span>
            </div>
            <Badge
              variant="outline"
              className="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
            >
              {todayTasks.length}
            </Badge>
          </div>
          {todayTasks.length > 0 && (
            <div className="space-y-1">
              {todayTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  • {task.title}
                </div>
              ))}
              {todayTasks.length > 3 && (
                <div className="text-xs text-gray-500">+{todayTasks.length - 3} tugas lagi</div>
              )}
            </div>
          )}
        </div>

        {/* Tugas Besok */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Besok</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {tomorrowTasks.length}
            </Badge>
          </div>
          {tomorrowTasks.length > 0 && (
            <div className="space-y-1">
              {tomorrowTasks.slice(0, 2).map((task) => (
                <div key={task.id} className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  • {task.title}
                </div>
              ))}
              {tomorrowTasks.length > 2 && (
                <div className="text-xs text-gray-500">+{tomorrowTasks.length - 2} tugas lagi</div>
              )}
            </div>
          )}
        </div>

        {/* Tugas Terlambat */}
        {overdueTasks.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">Terlambat</span>
              </div>
              <Badge variant="destructive">{overdueTasks.length}</Badge>
            </div>
            <div className="space-y-1">
              {overdueTasks.slice(0, 2).map((task) => (
                <div key={task.id} className="text-xs text-red-600 dark:text-red-400 truncate">
                  • {task.title}
                </div>
              ))}
              {overdueTasks.length > 2 && (
                <div className="text-xs text-red-500">+{overdueTasks.length - 2} tugas lagi</div>
              )}
            </div>
          </div>
        )}

        {/* Pencapaian Hari Ini */}
        {completedToday.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-white/20 dark:border-black/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Selesai Hari Ini</span>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                {completedToday.length}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}