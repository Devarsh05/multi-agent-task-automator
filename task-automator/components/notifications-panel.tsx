"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle2, Sparkles, X } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "info" | "reminder"
  title: string
  description: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Task completed",
    description: "Morning focus time has been completed",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "reminder",
    title: "Upcoming event",
    description: "Client presentation starts in 30 minutes",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "AI Agent update",
    description: "Planner Agent has created 8 new tasks for tomorrow",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "reminder",
    title: "Weekly planning",
    description: "Don't forget your weekly planning session at 4 PM",
    time: "1 day ago",
    read: true,
  },
]

export function NotificationsPanel() {
  return (
    <div className="space-y-4">
      {mockNotifications.map((notification) => (
        <Card
          key={notification.id}
          className={`bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg ${notification.read ? "opacity-60" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  notification.type === "success"
                    ? "bg-green-500/20 text-green-400"
                    : notification.type === "reminder"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {notification.type === "success" ? (
                  <CheckCircle2 className="size-4" />
                ) : notification.type === "reminder" ? (
                  <Bell className="size-4" />
                ) : (
                  <Sparkles className="size-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-white">{notification.title}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 -mt-1 text-slate-400 hover:text-white hover:bg-slate-800/50"
                  >
                    <X className="size-3" />
                  </Button>
                </div>
                <p className="text-sm text-slate-400 mb-2">{notification.description}</p>
                <p className="text-xs text-slate-500">{notification.time}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
