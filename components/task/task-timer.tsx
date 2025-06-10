"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Square, RotateCcw } from "lucide-react"
import type { Task } from "@/lib/types"

interface TaskTimerProps {
  task: Task | null
  onTimeUpdate?: (taskId: string, timeSpent: number) => void
}

export function TaskTimer({ task, onTimeUpdate }: TaskTimerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleStop = () => {
    setIsRunning(false)
    if (task && timeElapsed > 0 && onTimeUpdate) {
      onTimeUpdate(task.id, timeElapsed)
    }
    setTimeElapsed(0)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeElapsed(0)
  }

  if (!task) {
    return (
      <Card className="glass border-white/20 dark:border-black/20">
        <CardContent className="p-6 text-center">
          <div className="text-gray-400 dark:text-gray-600 mb-2">
            <Play className="w-8 h-8 mx-auto" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pilih tugas untuk memulai timer</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass border-white/20 dark:border-black/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Play className="w-5 h-5 text-blue-500" />
          Timer Tugas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="font-medium text-sm mb-2 truncate">{task.title}</h3>
          <div className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-2">
            {formatTime(timeElapsed)}
          </div>
          {task.estimatedTime && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Estimasi: {task.estimatedTime}h
              {timeElapsed > 0 && (
                <span className="ml-2">({Math.round((timeElapsed / 3600 / task.estimatedTime) * 100)}%)</span>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 h-8 px-3"
            >
              <Play className="w-3 h-3 mr-1" />
              Mulai
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 h-8 px-3"
            >
              <Pause className="w-3 h-3 mr-1" />
              Pause
            </Button>
          )}

          <Button
            onClick={handleStop}
            variant="outline"
            className="glass border-white/20 dark:border-black/20 h-8 px-3"
            disabled={timeElapsed === 0}
          >
            <Square className="w-3 h-3 mr-1" />
            Stop
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            className="glass border-white/20 dark:border-black/20 h-8 px-3"
            disabled={timeElapsed === 0}
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>

        {isRunning && (
          <div className="text-center">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 animate-pulse">
              ⏱️ Timer Aktif
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
