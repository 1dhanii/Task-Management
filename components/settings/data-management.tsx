"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Database, Download, Upload, Trash2, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"

interface DataManagementProps {
  tasks: any[]
  categories: any[]
  onDataImport: (data: any) => void
}

export function DataManagement({ tasks, categories, onDataImport }: DataManagementProps) {
  const [importData, setImportData] = useState("")
  const [isImporting, setIsImporting] = useState(false)

  const exportData = () => {
    const data = {
      tasks,
      categories,
      exportDate: new Date().toISOString(),
      version: "1.0",
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `taskflow-backup-${format(new Date(), "yyyy-MM-dd-HHmm")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "✅ Data berhasil diekspor",
      description: `${tasks.length} tugas dan ${categories.length} kategori telah diekspor`,
    })
  }

  const importDataFromText = async () => {
    if (!importData.trim()) {
      toast({
        title: "❌ Error",
        description: "Silakan masukkan data JSON yang valid",
        variant: "destructive",
      })
      return
    }

    setIsImporting(true)
    try {
      const data = JSON.parse(importData)

      if (!data.tasks || !Array.isArray(data.tasks)) {
        throw new Error("Format data tidak valid: tasks tidak ditemukan")
      }

      if (!data.categories || !Array.isArray(data.categories)) {
        throw new Error("Format data tidak valid: categories tidak ditemukan")
      }

      onDataImport(data)
      setImportData("")

      toast({
        title: "✅ Data berhasil diimpor",
        description: `${data.tasks.length} tugas dan ${data.categories.length} kategori telah diimpor`,
      })
    } catch (error) {
      toast({
        title: "❌ Error Import",
        description: error instanceof Error ? error.message : "Format data tidak valid",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  const clearAllData = () => {
    localStorage.clear()
    window.location.reload()
  }

  const getDataSize = () => {
    const dataString = JSON.stringify({ tasks, categories })
    const sizeInBytes = new Blob([dataString]).size
    const sizeInKB = (sizeInBytes / 1024).toFixed(2)
    return sizeInKB
  }

  return (
    <div className="space-y-6">
      {/* Data Statistics */}
      <Card className="glass border-white/20 dark:border-black/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-green-500" />
            Statistik Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{tasks.length}</div>
              <div className="text-sm text-gray-500">Total Tugas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{categories.length}</div>
              <div className="text-sm text-gray-500">Kategori</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {tasks.filter((t) => t.completed).length}
              </div>
              <div className="text-sm text-gray-500">Selesai</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{getDataSize()}</div>
              <div className="text-sm text-gray-500">KB Data</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Data */}
      <Card className="glass border-white/20 dark:border-black/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-500" />
            Export Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Unduh semua data tugas dan kategori sebagai file backup JSON.
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Format: JSON</Badge>
            <Badge variant="outline">Ukuran: ~{getDataSize()} KB</Badge>
          </div>
          <Button onClick={exportData} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Backup ({tasks.length} tugas)
          </Button>
        </CardContent>
      </Card>

      {/* Import Data */}
      <Card className="glass border-white/20 dark:border-black/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-purple-500" />
            Import Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Restore data dari file backup JSON. Data yang ada akan diganti.
          </p>
          <div className="space-y-2">
            <Label htmlFor="import-data">Data JSON</Label>
            <Textarea
              id="import-data"
              placeholder='{"tasks": [...], "categories": [...]}'
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              rows={6}
              className="glass border-white/20 dark:border-black/20 font-mono text-xs"
            />
          </div>
          <Button onClick={importDataFromText} disabled={!importData.trim() || isImporting} className="w-full">
            {isImporting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Mengimpor...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Reset Data */}
      <Card className="glass border-white/20 dark:border-black/20 border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Trash2 className="w-5 h-5" />
            Reset Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Hapus semua data termasuk tugas, kategori, dan pengaturan. Tindakan ini tidak dapat dibatalkan.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Reset Semua Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="glass border-white/20 dark:border-black/20">
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Reset Data</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin menghapus SEMUA data? Ini akan menghapus:
                  <br />• {tasks.length} tugas
                  <br />• {categories.length} kategori
                  <br />• Semua pengaturan
                  <br />
                  <br />
                  <strong>Tindakan ini tidak dapat dibatalkan!</strong>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={clearAllData} className="bg-red-600 hover:bg-red-700">
                  Ya, Reset Semua
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
