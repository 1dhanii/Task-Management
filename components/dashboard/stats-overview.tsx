"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { TaskStats } from "@/lib/types"
import { CheckCircle2, Clock, AlertTriangle, TrendingUp, Target, Zap } from "lucide-react"

interface StatsOverviewProps {
  stats: TaskStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      title: "📋 Total Tugas",
      value: stats.total,
      icon: Target,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "✅ Tugas Selesai",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      title: "⚠️ Tugas Terlambat",
      value: stats.overdue,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
    },
    {
      title: "⏰ Tugas Mendatang",
      value: stats.upcoming,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: "🔥 Prioritas Tinggi",
      value: stats.highPriority,
      icon: Zap,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      title: "📊 Tingkat Selesai",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className={`bg-white border ${stat.border} hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
