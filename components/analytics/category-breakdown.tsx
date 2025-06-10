"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Task, Category } from "@/lib/types"
import { PieChart } from "lucide-react"

interface CategoryBreakdownProps {
  tasks: Task[]
  categories: Category[]
}

export function CategoryBreakdown({ tasks, categories }: CategoryBreakdownProps) {
  const getCategoryStats = () => {
    return categories
      .map((category) => {
        const categoryTasks = tasks.filter((task) => task.category === category.name)
        const completedTasks = categoryTasks.filter((task) => task.completed)
        const completionRate =
          categoryTasks.length > 0 ? Math.round((completedTasks.length / categoryTasks.length) * 100) : 0

        return {
          ...category,
          total: categoryTasks.length,
          completed: completedTasks.length,
          active: categoryTasks.length - completedTasks.length,
          completionRate,
        }
      })
      .filter((cat) => cat.total > 0)
      .sort((a, b) => b.total - a.total)
  }

  const categoryStats = getCategoryStats()
  const totalTasks = tasks.length

  return (
    <Card className="glass border-white/20 dark:border-black/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-purple-500" />
          Breakdown per Kategori
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categoryStats.map((category, index) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {category.total} tugas
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{category.completionRate}%</div>
                  <div className="text-xs text-gray-500">
                    {category.completed}/{category.total}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Progress value={category.completionRate} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{Math.round((category.total / totalTasks) * 100)}% dari total tugas</span>
                  <span>{category.active} aktif</span>
                </div>
              </div>
            </div>
          ))}
          {categoryStats.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <PieChart className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Belum ada data kategori</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
