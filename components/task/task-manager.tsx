"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { TaskList } from "./task-list"
import { TaskForm } from "./task-form"
import { TaskFilters } from "./task-filters"
import { TaskBulkActions } from "./task-bulk-actions"
import { TaskSummary } from "./task-summary"
import { RecentActivity } from "./recent-activity"
import { ProductivityChart } from "@/components/analytics/productivity-chart"
import { CategoryBreakdown } from "@/components/analytics/category-breakdown"
import { PriorityAnalysis } from "@/components/analytics/priority-analysis"
import { useTasks } from "@/hooks/use-tasks"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { DEFAULT_CATEGORIES } from "@/lib/constants"
import { CheckCircle2, BarChart3, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function TaskManager() {
  const {
    tasks,
    allTasks,
    stats,
    filter,
    sort,
    searchQuery,
    setFilter,
    setSort,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    duplicateTask,
  } = useTasks()

  const [categories] = useLocalStorage("categories", DEFAULT_CATEGORIES)
  const [activeTab, setActiveTab] = useState("tasks")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const handleSelectTask = (taskId: string, selected: boolean) => {
    if (selected) {
      setSelectedTasks((prev) => [...prev, taskId])
    } else {
      setSelectedTasks((prev) => prev.filter((id) => id !== taskId))
    }
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedTasks(tasks.map((task) => task.id))
    } else {
      setSelectedTasks([])
    }
  }

  const handleBulkDelete = () => {
    if (selectedTasks.length === 0) return

    selectedTasks.forEach((taskId) => {
      deleteTask(taskId)
    })
    setSelectedTasks([])
  }

  const handleBulkToggle = () => {
    selectedTasks.forEach((taskId) => {
      toggleTask(taskId)
    })
    setSelectedTasks([])
  }

  const handleBulkUpdatePriority = (priority: "low" | "medium" | "high") => {
    selectedTasks.forEach((taskId) => {
      updateTask(taskId, { priority })
    })
    setSelectedTasks([])
  }

  const handleBulkUpdateCategory = (category: string) => {
    selectedTasks.forEach((taskId) => {
      updateTask(taskId, { category })
    })
    setSelectedTasks([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-white border border-gray-200 rounded-lg p-1">
              <TabsTrigger
                value="tasks"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-4 py-2"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />📋 Tugas ({tasks.length})
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-4 py-2"
              >
                <BarChart3 className="w-4 h-4 mr-2" />📊 Analitik
              </TabsTrigger>
            </TabsList>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white h-11 px-6 rounded-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Tugas
                </Button>
              </DialogTrigger>
              <DialogContent className="border-0 p-0 max-w-fit bg-transparent shadow-none">
                <TaskForm
                  categories={categories}
                  onSubmit={(taskData) => {
                    addTask(taskData)
                    setIsAddDialogOpen(false)
                  }}
                  onCancel={() => setIsAddDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <TaskFilters
                  filter={filter}
                  sort={sort}
                  categories={categories}
                  onFilterChange={setFilter}
                  onSortChange={setSort}
                />

                {/* Bulk Actions */}
                {selectedTasks.length > 0 && (
                  <TaskBulkActions
                    selectedCount={selectedTasks.length}
                    totalCount={tasks.length}
                    categories={categories}
                    onSelectAll={handleSelectAll}
                    onBulkDelete={handleBulkDelete}
                    onBulkToggle={handleBulkToggle}
                    onBulkUpdatePriority={handleBulkUpdatePriority}
                    onBulkUpdateCategory={handleBulkUpdateCategory}
                    onClearSelection={() => setSelectedTasks([])}
                  />
                )}

                <TaskList
                  tasks={tasks}
                  categories={categories}
                  selectedTasks={selectedTasks}
                  onToggle={toggleTask}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                  onDuplicate={duplicateTask}
                  onSelectTask={handleSelectTask}
                />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <TaskSummary tasks={allTasks} />
                <RecentActivity tasks={allTasks} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <ProductivityChart tasks={allTasks} />
                <CategoryBreakdown tasks={allTasks} categories={categories} />
              </div>
              <div className="space-y-6">
                <PriorityAnalysis tasks={allTasks} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}