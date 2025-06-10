"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X, Target, FileText, Zap, Folder, CalendarDays, Tag, Bell } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import type { Task, Category } from "@/lib/types"

interface TaskFormProps {
  categories: Category[]
  task?: Task
  onSubmit: (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "subtasks">) => void
  onCancel: () => void
}

export function TaskForm({ categories, task, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || ("medium" as const),
    dueDate: task?.dueDate || "",
    category: task?.category || "",
    tags: task?.tags || [],
    reminder: task?.reminder || false,
    reminderDate: task?.reminderDate || "",
  })

  const [newTag, setNewTag] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onSubmit({
      ...formData,
      completed: task?.completed || false,
      progress: task?.progress || 0,
      estimatedTime: task?.estimatedTime || 0,
      actualTime: task?.actualTime,
    })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  return (
    <div className="w-[420px] max-w-[90vw] bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
      <form onSubmit={handleSubmit}>
        {/* Minimalist Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-5 text-white">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              {task ? <FileText className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
            <h2 className="text-xl font-semibold">{task ? "✏️ Edit Tugas" : "🚀 Tambah Tugas"}</h2>
          </div>
          <p className="text-center text-blue-100 text-sm mt-1">
            {task ? "Perbarui detail tugas Anda" : "Wujudkan produktivitas maksimal dengan tugas baru"}
          </p>
        </div>

        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Title Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-3 h-3 text-blue-600" />
              </div>
              📝 Judul Tugas
            </Label>
            <Input
              placeholder="Masukkan judul tugas yang menginspirasi..."
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="h-11 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-3 h-3 text-purple-600" />
              </div>
              📄 Deskripsi
            </Label>
            <Textarea
              placeholder="Jelaskan detail tugas dengan lengkap dan jelas..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none transition-colors bg-gray-50 focus:bg-white min-h-[80px]"
              rows={3}
            />
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-3 h-3 text-orange-600" />
                </div>
                🏷️ Prioritas
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value as any }))}
              >
                <SelectTrigger className="h-11 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:bg-white transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 rounded-xl shadow-lg">
                  <SelectItem value="low" className="hover:bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>🟢 Rendah</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium" className="hover:bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>🟡 Sedang</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high" className="hover:bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>🔴 Tinggi</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Folder className="w-3 h-3 text-indigo-600" />
                </div>
                📁 Kategori
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="h-11 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:bg-white transition-colors">
                  <SelectValue placeholder="Pilih kategori yang..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 rounded-xl shadow-lg">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name} className="hover:bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center">
                <CalendarDays className="w-3 h-3 text-cyan-600" />
              </div>
              📅 Deadline
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-11 justify-start border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-colors font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-cyan-500" />
                  <span className={formData.dueDate ? "text-gray-900" : "text-gray-400"}>
                    {formData.dueDate
                      ? format(new Date(formData.dueDate), "dd MMMM yyyy", { locale: id })
                      : "Pilih tanggal deadline"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border-gray-100 rounded-xl shadow-lg">
                <Calendar
                  mode="single"
                  selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
                  onSelect={(date) => setFormData((prev) => ({ ...prev, dueDate: date ? date.toISOString() : "" }))}
                  initialFocus
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Tag className="w-3 h-3 text-emerald-600" />
              </div>
              🏷️ Tags
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Tambah tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag()
                  }
                }}
                className="flex-1 h-11 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-colors bg-gray-50 focus:bg-white"
              />
              <Button
                type="button"
                onClick={addTag}
                className="h-11 w-11 p-0 bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 border-0 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    #{tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-red-100 rounded-full w-4 h-4"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Reminder */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-3 h-3 text-blue-600" />
                  </div>
                  🔔 Pengingat
                </Label>
                <p className="text-xs text-gray-500 mt-1">Aktifkan notifikasi untuk tugas ini</p>
              </div>
              <Switch
                checked={formData.reminder}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, reminder: checked }))}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
            {formData.reminder && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600">Waktu Pengingat</Label>
                <Input
                  type="datetime-local"
                  value={formData.reminderDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, reminderDate: e.target.value }))}
                  className="h-10 text-sm border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors bg-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Clean Footer */}
        <div className="flex border-t border-gray-200">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="flex-1 h-14 text-gray-600 hover:bg-gray-50 rounded-none border-r border-gray-200 transition-colors font-medium"
          >
            <X className="w-4 h-4 mr-2" />❌ Batal
          </Button>
          <Button
            type="submit"
            disabled={!formData.title.trim()}
            className="flex-1 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-none transition-colors font-medium disabled:opacity-50"
          >
            {task ? (
              <>
                <FileText className="w-4 h-4 mr-2" />💾 Perbarui Tugas
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />🚀 Tambah Tugas
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
