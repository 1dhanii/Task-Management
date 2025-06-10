"use client"

import { useCallback } from "react"
import { toast } from "@/hooks/use-toast"

export function useNotifications() {
  const scheduleNotification = useCallback((id: string, title: string, date: Date) => {
    const now = new Date()
    const timeUntilNotification = date.getTime() - now.getTime()

    if (timeUntilNotification > 0) {
      setTimeout(() => {
        toast({
          title: "🔔 Pengingat Tugas",
          description: `Saatnya mengerjakan: "${title}"`,
          duration: 10000,
        })
      }, timeUntilNotification)
    }
  }, [])

  const cancelNotification = useCallback((id: string) => {
    // In a real app, you'd store timeout IDs and clear them
    // For this demo, we'll just log it
    console.log(`Cancelled notification for task ${id}`)
  }, [])

  return { scheduleNotification, cancelNotification }
}
