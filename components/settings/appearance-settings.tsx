"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Palette, Monitor, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { toast } from "@/hooks/use-toast"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [compactMode, setCompactMode] = useLocalStorage("compactMode", false)
  const [showProgress, setShowProgress] = useLocalStorage("showProgress", true)
  const [showCategories, setShowCategories] = useLocalStorage("showCategories", true)
  const [fontSize, setFontSize] = useLocalStorage("fontSize", "medium")

  const handleCompactModeChange = (enabled: boolean) => {
    setCompactMode(enabled)
    toast({
      title: "Pengaturan disimpan",
      description: `Mode kompak ${enabled ? "diaktifkan" : "dinonaktifkan"}`,
    })
  }

  const handleShowProgressChange = (enabled: boolean) => {
    setShowProgress(enabled)
    toast({
      title: "Pengaturan disimpan",
      description: `Progress bar ${enabled ? "ditampilkan" : "disembunyikan"}`,
    })
  }

  const handleShowCategoriesChange = (enabled: boolean) => {
    setShowCategories(enabled)
    toast({
      title: "Pengaturan disimpan",
      description: `Kategori ${enabled ? "ditampilkan" : "disembunyikan"}`,
    })
  }

  const handleFontSizeChange = (size: string) => {
    setFontSize(size)
    toast({
      title: "Pengaturan disimpan",
      description: `Ukuran font diubah ke ${size}`,
    })
  }

  return (
    <Card className="glass border-white/20 dark:border-black/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-500" />
          Tampilan & Tema
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Tema Aplikasi</Label>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
              className="flex items-center gap-2 h-12"
            >
              <Sun className="w-4 h-4" />
              Terang
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2 h-12"
            >
              <Moon className="w-4 h-4" />
              Gelap
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              onClick={() => setTheme("system")}
              className="flex items-center gap-2 h-12"
            >
              <Monitor className="w-4 h-4" />
              Sistem
            </Button>
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Ukuran Font</Label>
          <Select value={fontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger className="glass border-white/20 dark:border-black/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass">
              <SelectItem value="small">Kecil</SelectItem>
              <SelectItem value="medium">Sedang</SelectItem>
              <SelectItem value="large">Besar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Display Options */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Opsi Tampilan</Label>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="compact-mode">Mode Kompak</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tampilkan tugas dengan padding yang lebih kecil
              </p>
            </div>
            <Switch id="compact-mode" checked={compactMode} onCheckedChange={handleCompactModeChange} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="show-progress">Tampilkan Progress Bar</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tampilkan progress bar pada setiap tugas</p>
            </div>
            <Switch id="show-progress" checked={showProgress} onCheckedChange={handleShowProgressChange} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="show-categories">Tampilkan Kategori</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tampilkan icon dan nama kategori pada tugas</p>
            </div>
            <Switch id="show-categories" checked={showCategories} onCheckedChange={handleShowCategoriesChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
