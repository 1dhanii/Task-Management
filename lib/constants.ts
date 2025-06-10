import type { Category } from "./types"

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "work", name: "Pekerjaan", color: "#3b82f6", icon: "💼" },
  { id: "personal", name: "Pribadi", color: "#10b981", icon: "🏠" },
  { id: "study", name: "Belajar", color: "#f59e0b", icon: "📚" },
  { id: "health", name: "Kesehatan", color: "#ef4444", icon: "💪" },
  { id: "finance", name: "Keuangan", color: "#8b5cf6", icon: "💰" },
  { id: "hobby", name: "Hobi", color: "#ec4899", icon: "🎨" },
  { id: "travel", name: "Perjalanan", color: "#06b6d4", icon: "✈️" },
  { id: "other", name: "Lainnya", color: "#6b7280", icon: "📝" },
]

export const PRIORITY_COLORS = {
  low: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-300",
    border: "border-green-200 dark:border-green-800",
    glow: "shadow-green-500/20",
  },
  medium: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-800 dark:text-yellow-300",
    border: "border-yellow-200 dark:border-yellow-800",
    glow: "shadow-yellow-500/20",
  },
  high: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
    glow: "shadow-red-500/20",
  },
}

export const SOUND_EFFECTS = {
  taskComplete: "/sounds/complete.mp3",
  taskAdd: "/sounds/add.mp3",
  taskDelete: "/sounds/delete.mp3",
  notification: "/sounds/notification.mp3",
}
