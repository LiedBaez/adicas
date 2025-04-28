"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface TimerProps {
  duration: number
  onExpire: () => void
  isExpired: boolean
}

export function Timer({ duration, onExpire, isExpired }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (isExpired) {
      setTimeLeft(0)
      setProgress(0)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          onExpire()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [duration, onExpire, isExpired])

  useEffect(() => {
    setProgress((timeLeft / duration) * 100)
  }, [timeLeft, duration])

  // Formatear el tiempo restante en mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Determinar el color basado en el tiempo restante
  const getColorClass = () => {
    if (progress > 50) return "text-green-600"
    if (progress > 20) return "text-amber-500"
    return "text-red-600"
  }

  return (
    <div className="flex flex-col items-end">
      <div className={`flex items-center ${getColorClass()}`}>
        <Clock className="h-4 w-4 mr-1" />
        <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
      </div>
      <div className="w-24 mt-1">
        <Progress
          value={progress}
          className={`h-1.5 ${progress > 50 ? "bg-green-100" : progress > 20 ? "bg-amber-100" : "bg-red-100"}`}
          indicatorClassName={progress > 50 ? "bg-green-600" : progress > 20 ? "bg-amber-500" : "bg-red-600"}
        />
      </div>
    </div>
  )
}
