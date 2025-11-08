"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react"

const mockEvents = [
  { id: 1, title: "Morning focus time", time: "9:00 AM", duration: "2h", color: "bg-primary" },
  { id: 2, title: "Team standup", time: "11:00 AM", duration: "30m", color: "bg-chart-2" },
  { id: 3, title: "Lunch break", time: "12:00 PM", duration: "1h", color: "bg-muted" },
  { id: 4, title: "Client presentation", time: "2:00 PM", duration: "1h", color: "bg-chart-4" },
  { id: 5, title: "Weekly planning", time: "4:00 PM", duration: "1h", color: "bg-chart-3" },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const today = new Date()
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Calendar
          </h1>
          <p className="text-slate-400 mt-1">View and manage your scheduled events</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/20">
          <Plus className="size-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
          <CardContent className="p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={previousMonth}
                  className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                  className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextMonth}
                  className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-2">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1
                  const isCurrentDay = isToday(day)

                  return (
                    <button
                      key={day}
                      className={`aspect-square p-2 rounded-lg text-sm font-medium transition-all ${
                        isCurrentDay
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                          : "hover:bg-slate-800/50 text-white"
                      }`}
                    >
                      {day}
                      {day === today.getDate() && currentDate.getMonth() === today.getMonth() && (
                        <div className="flex justify-center gap-0.5 mt-1">
                          <div className="size-1 rounded-full bg-white" />
                          <div className="size-1 rounded-full bg-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Events */}
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-1">Today's Events</h3>
                <p className="text-sm text-slate-400">
                  {today.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="space-y-3">
                {mockEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg border border-slate-800/50 bg-slate-950/30 hover:bg-slate-800/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`size-1.5 rounded-full ${event.color === "bg-primary" ? "bg-blue-500" : event.color === "bg-chart-2" ? "bg-purple-500" : event.color === "bg-muted" ? "bg-slate-500" : event.color === "bg-chart-4" ? "bg-pink-500" : "bg-green-500"} mt-2`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white mb-1">{event.title}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="size-3" />
                          {event.time} • {event.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white mb-1">Calendar Integration</h3>
              <p className="text-sm text-slate-400">Connect your Google Calendar to sync events automatically</p>
            </div>
            <Button
              variant="outline"
              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Connect Google Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
