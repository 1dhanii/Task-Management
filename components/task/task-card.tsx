"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { TaskForm } from "./task-form"
import type { Task, Category } from "@/lib/types"
import {
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
  Copy,
  Calendar,
  Clock,
  Tag,
  AlertTriangle,
  Bell,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format, isBefore, isToday } from "date-fns"
import { id } from "date-fns/locale"

interface TaskCardProps {
  task: Task
  categories: Category[]
  isSelected: boolean
  onToggle: () => void
  onUpdate: (updates: Partial<Task>) => void
  onDelete: () => void
  onDuplicate: () => void
  onSelect: (selected: boolean) => void
}

export function TaskCard({
  task,
  categories,
  isSelected,
  onToggle,
  onUpdate,
  onDelete,
  onDuplicate,
  onSelect,
}: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const getCategoryInfo = (categoryName: string) => {
    return categories.find((cat) => cat.name === categoryName) || categories[categories.length - 1]
  }

  const categoryInfo = getCategoryInfo(task.category)

  const isOverdue =
    task.dueDate && !task.completed && isBefore(new Date(task.dueDate), new Date()) && !isToday(new Date(task.dueDate))
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate))

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-200"
      case "medium":
        return "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 border-amber-200"
      case "low":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-200"
    }
  }

  return (
    <>
      <Card
        className={`bg-white border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-200 rounded-xl overflow-hidden ${
          task.completed ? "opacity-75" : ""
        } ${isOverdue ? "border-l-4 border-l-red-500" : ""} ${
          isSelected ? "ring-2 ring-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg" : ""
        }`}
      >
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            {/* Selection Checkbox */}
            <div className="relative mt-0.5">
              <Checkbox
                checked={isSelected}
                onCheckedChange={onSelect}
                className="w-4 h-4 rounded-md border-2 border-blue-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600 data-[state=checked]:border-blue-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>

            {/* Completion Toggle */}
            <Button variant="ghost" size="sm" className="p-0 h-auto mt-0.5" onClick={onToggle}>
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 hover:text-green-600 transition-colors" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
              )}
            </Button>

            {/* Task Content */}
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsDetailsOpen(true)}>
              {/* Title and Badges */}
              <div className="flex flex-wrap items-center gap-1 mb-1">
                <h3
                  className={`font-medium text-sm ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                >
                  {task.title}
                </h3>

                {/* Priority Badge */}
                <Badge className={`text-xs px-2 py-0.5 h-5 rounded-full border-0 ${getPriorityColor(task.priority)}`}>
                  {task.priority === "high" ? "🔴" : task.priority === "medium" ? "🟡" : "🟢"}
                </Badge>

                {/* Status Badges */}
                {isOverdue && (
                  <Badge className="text-xs px-2 py-0.5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full border-0">
                    <AlertTriangle className="w-2 h-2 mr-0.5" />
                    Terlambat
                  </Badge>
                )}
                {isDueToday && !task.completed && (
                  <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-0.5 h-5 rounded-full border-0">
                    <Clock className="w-2 h-2 mr-0.5" />
                    Hari Ini
                  </Badge>
                )}
                {task.reminder && (
                  <Badge className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs px-2 py-0.5 h-5 rounded-full border-0">
                    <Bell className="w-2 h-2 mr-0.5" />
                    Pengingat
                  </Badge>
                )}
              </div>

              {/* Description */}
              {task.description && (
                <p className={`text-xs mb-1 line-clamp-1 ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                  {task.description}
                </p>
              )}

              {/* Progress Bar */}
              {task.progress > 0 && (
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-700">{task.progress}%</span>
                  </div>
                  <Progress
                    value={task.progress}
                    className="h-1.5 bg-gray-200 rounded-full overflow-hidden"
                    indicatorClassName={`${
                      task.progress === 100
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : "bg-gradient-to-r from-blue-500 to-purple-600"
                    } transition-all`}
                  />
                </div>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                {/* Category */}
                {task.category && (
                  <div className="flex items-center gap-0.5 bg-gray-100 px-2 py-0.5 rounded-full">
                    <span className="text-xs">{categoryInfo.icon}</span>
                    <span>{task.category}</span>
                  </div>
                )}

                {/* Due Date */}
                {task.dueDate && (
                  <div
                    className={`flex items-center gap-0.5 bg-gray-100 px-2 py-0.5 rounded-full ${isOverdue ? "bg-red-100 text-red-600 font-medium" : ""}`}
                  >
                    <Calendar className="w-2 h-2" />
                    <span>{format(new Date(task.dueDate), "dd MMM", { locale: id })}</span>
                  </div>
                )}

                {/* Estimated Time */}
                {task.estimatedTime && task.estimatedTime > 0 && (
                  <div className="flex items-center gap-0.5 bg-gray-100 px-2 py-0.5 rounded-full">
                    <Clock className="w-2 h-2" />
                    <span>{task.estimatedTime}h</span>
                  </div>
                )}

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                  <div className="flex items-center gap-0.5 bg-gray-100 px-2 py-0.5 rounded-full">
                    <Tag className="w-2 h-2" />
                    <span>{task.tags.slice(0, 2).join(", ")}</span>
                    {task.tags.length > 2 && <span>+{task.tags.length - 2}</span>}
                  </div>
                )}
              </div>

              {/* Tags Display */}
              {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {task.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-xs border border-blue-200"
                    >
                      #{tag}
                    </span>
                  ))}
                  {task.tags.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500 border border-gray-200">
                      +{task.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-100 rounded-xl shadow-xl">
                <DropdownMenuItem
                  onClick={() => setIsEditDialogOpen(true)}
                  className="cursor-pointer text-sm hover:bg-blue-50 rounded-lg"
                >
                  <Edit3 className="w-3 h-3 mr-2 text-blue-500" />
                  ✏️ Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onDuplicate}
                  className="cursor-pointer text-sm hover:bg-purple-50 rounded-lg"
                >
                  <Copy className="w-3 h-3 mr-2 text-purple-500" />📋 Duplikat
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="cursor-pointer text-red-600 text-sm hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  🗑️ Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="border-0 p-0 max-w-fit bg-transparent">
          <TaskForm
            task={task}
            categories={categories}
            onSubmit={(taskData) => {
              onUpdate(taskData)
              setIsEditDialogOpen(false)
            }}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Task Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md bg-white border-0 rounded-xl shadow-xl">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className={`text-lg font-bold ${task.completed ? "line-through text-gray-500" : ""}`}>
                  {task.title}
                </h2>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge
                    className={
                      task.completed
                        ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-0 rounded-full"
                        : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 rounded-full"
                    }
                  >
                    {task.completed ? "✅ Selesai" : "⏳ Aktif"}
                  </Badge>
                  <Badge className={`border-0 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority === "high" ? "🔴 Tinggi" : task.priority === "medium" ? "🟡 Sedang" : "🟢 Rendah"}
                  </Badge>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">{categoryInfo.icon}</span>
              </div>
            </div>

            {task.description && (
              <div>
                <h3 className="font-semibold mb-2 text-sm text-gray-700">📄 Deskripsi</h3>
                <p className="text-gray-600 whitespace-pre-wrap text-sm bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-gray-100">
                  {task.description}
                </p>
              </div>
            )}

            {task.progress > 0 && (
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-sm text-gray-700">📊 Progress</h3>
                  <span className="font-medium text-sm">{task.progress}%</span>
                </div>
                <Progress
                  value={task.progress}
                  className="h-3 bg-gray-200 rounded-full overflow-hidden"
                  indicatorClassName={`${
                    task.progress === 100
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : "bg-gradient-to-r from-blue-500 to-purple-600"
                  } transition-all`}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              {task.category && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-gray-100">
                  <h3 className="font-semibold mb-1 text-gray-700">📁 Kategori</h3>
                  <div className="flex items-center gap-1">
                    <span>{categoryInfo.icon}</span>
                    <span>{task.category}</span>
                  </div>
                </div>
              )}

              {task.dueDate && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-gray-100">
                  <h3 className="font-semibold mb-1 text-gray-700">📅 Deadline</h3>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                      {format(new Date(task.dueDate), "dd MMMM yyyy", { locale: id })}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {task.tags && task.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-sm text-gray-700">🏷️ Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {task.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 rounded-full text-xs px-3 py-1"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 border-t pt-3 bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <div>📅 Dibuat: {format(new Date(task.createdAt), "dd MMM yyyy", { locale: id })}</div>
                <div>🔄 Diperbarui: {format(new Date(task.updatedAt), "dd MMM yyyy", { locale: id })}</div>
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              <Button
                onClick={onToggle}
                className={`flex-1 h-10 text-sm rounded-lg shadow-md transition-all ${
                  task.completed
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                }`}
              >
                {task.completed ? "🔄 Tandai Belum Selesai" : "✅ Tandai Selesai"}
              </Button>
              <Button
                onClick={() => {
                  setIsDetailsOpen(false)
                  setIsEditDialogOpen(true)
                }}
                variant="outline"
                className="flex-1 h-10 text-sm border-gray-200 rounded-lg hover:bg-blue-50 transition-all"
              >
                <Edit3 className="w-3 h-3 mr-1" />
                ✏️ Edit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
