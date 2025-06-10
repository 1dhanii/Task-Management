"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Zap, Clock } from "lucide-react"
import type { Task } from "@/lib/types"

interface TaskQuickActionsProps {
  onAddTask: (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "subtasks">) => void
}

export function TaskQuickActions({ onAddTask }: TaskQuickActionsProps) {
  const [quickTitle, setQuickTitle] = useState("")

  const quickTemplates = [
    {
      title: "Meeting dengan tim",
      priority: "medium" as const,
      category: "Pekerjaan",
      icon: "💼",
      estimatedTime: 1,
    },
    {
      title: "Review kode",
      priority: "high" as const,
      category: "Pekerjaan",
      icon: "💻",
      estimatedTime: 2,
    },
    {
      title: "Olahraga pagi",
      priority: "low" as const,
      category: "Kesehatan",
      icon: "💪",
      estimatedTime: 1,
    },
    {
      title: "Baca buku",
      priority: "low" as const,
      category: "Pribadi",
      icon: "📚",
      estimatedTime: 1,
    },
  ]

  const handleQuickAdd = () => {
    if (!quickTitle.trim()) return

    onAddTask({
      title: quickTitle,
      description: "",
      priority: "medium",
      dueDate: "",
      category: "Lainnya",
      progress: 0,
      tags: [],
      reminder: false,
      completed: false,
      estimatedTime: 1,
    })

    setQuickTitle("")
  }

  const handleTemplateAdd = (template: (typeof quickTemplates)[0]) => {
    onAddTask({
      title: template.title,
      description: "",
      priority: template.priority,
      dueDate: "",
      category: template.category,
      progress: 0,
      tags: [],
      reminder: false,
      completed: false,
      estimatedTime: template.estimatedTime,
    })
  }

  return (
    <Card className="glass border-white/20 dark:border-black/20 mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Quick Add */}
          <div className="flex gap-2">
            <Input
              placeholder="Tambah tugas cepat..."
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleQuickAdd()
                }
              }}
              className="glass border-white/20 dark:border-black/20 h-9"
            />
            <Button
              onClick={handleQuickAdd}
              disabled={!quickTitle.trim()}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 h-9 px-3"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Templates */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Template Cepat</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleTemplateAdd(template)}
                  className="glass border-white/20 dark:border-black/20 h-auto p-2 justify-start hover:scale-105 transition-transform duration-150"
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-lg">{template.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="text-xs font-medium truncate">{template.title}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-1 py-0 ${
                            template.priority === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              : template.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          }`}
                        >
                          {template.priority === "high"
                            ? "Tinggi"
                            : template.priority === "medium"
                              ? "Sedang"
                              : "Rendah"}
                        </Badge>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Clock className="w-2 h-2" />
                          {template.estimatedTime}h
                        </div>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
