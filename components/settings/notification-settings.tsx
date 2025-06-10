"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Bell, Smartphone } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { toast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const [enableNotifications, setEnableNotifications] = useLocalStorage("enableNotifications", true)
  const [enableSounds, setEnableSounds] = useLocalStorage("enableSounds", true)
  const [reminderTime, setReminderTime] = useLocalStorage("reminderTime", "15")
  const [dailyDigest, setDailyDigest] = useLocalStorage("dailyDigest", true)
  const [weeklyReport, setWeeklyReport] = useLocalStorage("weeklyReport", false)

  const handleNotificationChange = (enabled: boolean) => {
    setEnableNotifications(enabled)
    if (enabled) {
      // Request notification permission
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            toast({
              title: "Notifikasi diaktifkan",
              description: "Anda akan menerima pengingat tugas",
            })
          }
        })
      } else {
        toast({
          title: "Notifikasi diaktifkan",
          description: "Anda akan menerima pengingat tugas",
        })
      }
    } else {
      toast({
        title: "Notifikasi dinonaktifkan",
        description: "Anda tidak akan menerima pengingat",
      })
    }
  }

  const testNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Test Notifikasi", {
        body: "Ini adalah contoh notifikasi dari TaskFlow",
        icon: "/favicon.ico",
      })
    } else {
      toast({
        title: "Test Notifikasi",
        description: "Ini adalah contoh notifikasi dari TaskFlow",
      })
    }
  }

  return (
    <Card className="glass border-white/20 dark:border-black/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-500" />
          Notifikasi & Pengingat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable Notifications */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="enable-notifications">Aktifkan Notifikasi</Label>
            <p className="text-xs text-gray-500 dark:text-gray-400">Terima pengingat untuk tugas dan deadline</p>
          </div>
          <Switch id="enable-notifications" checked={enableNotifications} onCheckedChange={handleNotificationChange} />
        </div>

        {/* Sound Settings */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="enable-sounds">Suara Notifikasi</Label>
            <p className="text-xs text-gray-500 dark:text-gray-400">Putar suara saat menerima notifikasi</p>
          </div>
          <Switch
            id="enable-sounds"
            checked={enableSounds}
            onCheckedChange={setEnableSounds}
            disabled={!enableNotifications}
          />
        </div>

        {/* Reminder Time */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Waktu Pengingat Default</Label>
          <Select value={reminderTime} onValueChange={setReminderTime} disabled={!enableNotifications}>
            <SelectTrigger className="glass border-white/20 dark:border-black/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass">
              <SelectItem value="5">5 menit sebelum</SelectItem>
              <SelectItem value="15">15 menit sebelum</SelectItem>
              <SelectItem value="30">30 menit sebelum</SelectItem>
              <SelectItem value="60">1 jam sebelum</SelectItem>
              <SelectItem value="1440">1 hari sebelum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Daily Digest */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="daily-digest">Ringkasan Harian</Label>
            <p className="text-xs text-gray-500 dark:text-gray-400">Terima ringkasan tugas setiap pagi</p>
          </div>
          <Switch
            id="daily-digest"
            checked={dailyDigest}
            onCheckedChange={setDailyDigest}
            disabled={!enableNotifications}
          />
        </div>

        {/* Weekly Report */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="weekly-report">Laporan Mingguan</Label>
            <p className="text-xs text-gray-500 dark:text-gray-400">Terima laporan produktivitas setiap minggu</p>
          </div>
          <Switch
            id="weekly-report"
            checked={weeklyReport}
            onCheckedChange={setWeeklyReport}
            disabled={!enableNotifications}
          />
        </div>

        {/* Test Notification */}
        <div className="pt-4 border-t border-white/20 dark:border-black/20">
          <Button
            onClick={testNotification}
            variant="outline"
            className="w-full glass border-white/20 dark:border-black/20"
            disabled={!enableNotifications}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Test Notifikasi
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
