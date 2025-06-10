"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, X } from "lucide-react"
import type { FilterOptions, SortOptions, Category } from "@/lib/types"

interface TaskFiltersProps {
  filter: FilterOptions
  sort: SortOptions
  categories: Category[]
  onFilterChange: (filter: FilterOptions) => void
  onSortChange: (sort: SortOptions) => void
}

export function TaskFilters({ filter, sort, categories, onFilterChange, onSortChange }: TaskFiltersProps) {
  const hasActiveFilters = filter.status !== "all" || filter.category !== "all" || filter.priority !== "all"

  const clearFilters = () => {
    onFilterChange({
      status: "all",
      category: "all",
      priority: "all",
      dateRange: {},
    })
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "all":
        return "📋 Semua Status"
      case "active":
        return "⏳ Tugas Aktif"
      case "completed":
        return "✅ Tugas Selesai"
      default:
        return "📋 Semua Status"
    }
  }

  const getCategoryLabel = (categoryName: string) => {
    if (categoryName === "all") return "📁 Semua Kategori"
    const category = categories.find((cat) => cat.name === categoryName)
    return category ? `${category.icon} ${category.name}` : "📁 Semua Kategori"
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "all":
        return "🏷️ Semua Prioritas"
      case "high":
        return "🔴 Prioritas Tinggi"
      case "medium":
        return "🟡 Prioritas Sedang"
      case "low":
        return "🟢 Prioritas Rendah"
      default:
        return "🏷️ Semua Prioritas"
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* Status Filter */}
      <Select value={filter.status} onValueChange={(value) => onFilterChange({ ...filter, status: value as any })}>
        <SelectTrigger className="w-44 h-11 text-sm border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-all">
          <SelectValue>{getStatusLabel(filter.status)}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-100 rounded-xl shadow-xl" side="top" align="start">
          <SelectItem value="all" className="text-sm hover:bg-gray-50 rounded-lg m-1">
            📋 Semua Status
          </SelectItem>
          <SelectItem value="active" className="text-sm hover:bg-blue-50 rounded-lg m-1">
            ⏳ Tugas Aktif
          </SelectItem>
          <SelectItem value="completed" className="text-sm hover:bg-green-50 rounded-lg m-1">
            ✅ Tugas Selesai
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Category Filter */}
      <Select value={filter.category} onValueChange={(value) => onFilterChange({ ...filter, category: value })}>
        <SelectTrigger className="w-48 h-11 text-sm border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-all">
          <SelectValue>{getCategoryLabel(filter.category)}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-100 rounded-xl shadow-xl" side="top" align="start">
          <SelectItem value="all" className="text-sm hover:bg-gray-50 rounded-lg m-1">
            📁 Semua Kategori
          </SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name} className="text-sm hover:bg-blue-50 rounded-lg m-1">
              {category.icon} {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Priority Filter */}
      <Select value={filter.priority} onValueChange={(value) => onFilterChange({ ...filter, priority: value })}>
        <SelectTrigger className="w-48 h-11 text-sm border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-all">
          <SelectValue>{getPriorityLabel(filter.priority)}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-100 rounded-xl shadow-xl" side="top" align="start">
          <SelectItem value="all" className="text-sm hover:bg-gray-50 rounded-lg m-1">
            🏷️ Semua Prioritas
          </SelectItem>
          <SelectItem value="high" className="text-sm hover:bg-red-50 rounded-lg m-1">
            🔴 Prioritas Tinggi
          </SelectItem>
          <SelectItem value="medium" className="text-sm hover:bg-yellow-50 rounded-lg m-1">
            🟡 Prioritas Sedang
          </SelectItem>
          <SelectItem value="low" className="text-sm hover:bg-green-50 rounded-lg m-1">
            🟢 Prioritas Rendah
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Options */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-11 text-sm border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-all px-4"
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />📊 Urutkan
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 bg-white border-gray-100 rounded-xl shadow-xl p-5" side="top" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Urutkan berdasarkan</label>
              <Select value={sort.field} onValueChange={(value) => onSortChange({ ...sort, field: value as any })}>
                <SelectTrigger className="bg-white border-gray-200 h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 rounded-xl shadow-xl">
                  <SelectItem value="dueDate" className="text-sm hover:bg-blue-50 rounded-lg m-1">
                    📅 Tanggal Deadline
                  </SelectItem>
                  <SelectItem value="title" className="text-sm hover:bg-blue-50 rounded-lg m-1">
                    📝 Judul Tugas
                  </SelectItem>
                  <SelectItem value="priority" className="text-sm hover:bg-blue-50 rounded-lg m-1">
                    🏷️ Prioritas
                  </SelectItem>
                  <SelectItem value="progress" className="text-sm hover:bg-blue-50 rounded-lg m-1">
                    📊 Progress
                  </SelectItem>
                  <SelectItem value="createdAt" className="text-sm hover:bg-blue-50 rounded-lg m-1">
                    🕒 Tanggal Dibuat
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Arah pengurutan</label>
              <Select
                value={sort.direction}
                onValueChange={(value) => onSortChange({ ...sort, direction: value as any })}
              >
                <SelectTrigger className="bg-white border-gray-200 h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 rounded-xl shadow-xl">
                  <SelectItem value="asc" className="text-sm hover:bg-blue-50 rounded-lg m-1">
                    ⬆️ Naik (A-Z, Lama-Baru)
                  </SelectItem>
                  <SelectItem value="desc" className="text-sm hover:bg-blue-50 rounded-lg m-1">
                    ⬇️ Turun (Z-A, Baru-Lama)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-500 hover:text-gray-700 h-11 text-sm rounded-xl hover:bg-gray-100 transition-all px-4"
        >
          <X className="w-4 h-4 mr-2" />🧹 Hapus Filter
        </Button>
      )}

      {/* Active Filter Badges */}
      <div className="flex flex-wrap gap-2 ml-auto">
        {filter.status !== "all" && (
          <Badge className="text-xs bg-blue-100 text-blue-700 border-0 rounded-full px-3 py-1">
            Status: {filter.status === "active" ? "Aktif" : "Selesai"}
          </Badge>
        )}
        {filter.category !== "all" && (
          <Badge className="text-xs bg-purple-100 text-purple-700 border-0 rounded-full px-3 py-1">
            Kategori: {filter.category}
          </Badge>
        )}
        {filter.priority !== "all" && (
          <Badge className="text-xs bg-amber-100 text-amber-700 border-0 rounded-full px-3 py-1">
            Prioritas: {filter.priority === "high" ? "Tinggi" : filter.priority === "medium" ? "Sedang" : "Rendah"}
          </Badge>
        )}
      </div>
    </div>
  )
}