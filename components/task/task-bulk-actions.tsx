"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Trash2, CheckCircle2, X, Flag, Tag } from "lucide-react"
import type { Category } from "@/lib/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface TaskBulkActionsProps {
  selectedCount: number
  totalCount: number
  categories: Category[]
  onSelectAll: (selected: boolean) => void
  onBulkDelete: () => void
  onBulkToggle: () => void
  onBulkUpdatePriority: (priority: "low" | "medium" | "high") => void
  onBulkUpdateCategory: (category: string) => void
  onClearSelection: () => void
}

export function TaskBulkActions({
  selectedCount,
  totalCount,
  categories,
  onSelectAll,
  onBulkDelete,
  onBulkToggle,
  onBulkUpdatePriority,
  onBulkUpdateCategory,
  onClearSelection,
}: TaskBulkActionsProps) {
  const isAllSelected = selectedCount === totalCount
  const isPartialSelected = selectedCount > 0 && selectedCount < totalCount

  return (
    <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border border-blue-200 shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Checkbox
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartialSelected
                  }}
                  onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                  className="w-6 h-6 rounded-lg border-2 border-blue-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600 data-[state=checked]:border-blue-500 transition-all shadow-sm hover:shadow-md"
                />
                {isPartialSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-sm"></div>
                  </div>
                )}
              </div>
              <span className="text-sm font-semibold text-gray-700">✅ Pilih Semua</span>
            </div>
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 px-4 py-2 rounded-full shadow-sm text-sm font-medium">
              {selectedCount} dari {totalCount} tugas dipilih
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Bulk Priority Update */}
            <Select onValueChange={(value) => onBulkUpdatePriority(value as "low" | "medium" | "high")}>
              <SelectTrigger className="w-40 h-11 text-sm border-blue-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">🏷️ Prioritas</span>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-100 rounded-xl shadow-xl" side="top" align="start">
                <SelectItem value="high" className="hover:bg-red-50 rounded-lg m-1">
                  🔴 Prioritas Tinggi
                </SelectItem>
                <SelectItem value="medium" className="hover:bg-yellow-50 rounded-lg m-1">
                  🟡 Prioritas Sedang
                </SelectItem>
                <SelectItem value="low" className="hover:bg-green-50 rounded-lg m-1">
                  🟢 Prioritas Rendah
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Bulk Category Update */}
            <Select onValueChange={onBulkUpdateCategory}>
              <SelectTrigger className="w-40 h-11 text-sm border-blue-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">📁 Kategori</span>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-100 rounded-xl shadow-xl" side="top" align="start">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name} className="hover:bg-blue-50 rounded-lg m-1">
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkToggle}
              className="border-green-200 bg-white text-green-600 hover:bg-green-50 h-11 px-4 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">✅ Toggle Status</span>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 bg-white text-red-600 hover:bg-red-50 h-11 px-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">🗑️ Hapus ({selectedCount})</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white border-gray-100 rounded-2xl shadow-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-bold text-gray-900">
                    🗑️ Hapus Tugas Terpilih
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus {selectedCount} tugas yang dipilih? Tindakan ini tidak dapat
                    dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">❌ Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onBulkDelete}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl"
                  >
                    🗑️ Hapus Semua
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-11 px-4 rounded-xl transition-all"
            >
              <X className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">❌ Batal</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
