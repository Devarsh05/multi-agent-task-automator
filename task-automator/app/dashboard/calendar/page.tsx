"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { CalendarEventForm } from "./components/CalendarEventForm"
import { EventCard } from "./components/EventCard"
import { toast } from "sonner"
import { format, startOfMonth, endOfMonth, isSameDay, isSameMonth } from "date-fns"

interface CalendarEvent {
  id: string
  title: string
  description?: string | null
  startTime: string
  endTime: string
  allDay: boolean
  color?: string | null
  createdAt: string
  updatedAt: string
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

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

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const startOfCurrentMonth = startOfMonth(currentDate)
      const endOfCurrentMonth = endOfMonth(currentDate)

      const response = await fetch(
        `/api/calendar?startDate=${startOfCurrentMonth.toISOString()}&endDate=${endOfCurrentMonth.toISOString()}`,
        {
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch events")
      }

      const data = await response.json()
      setEvents(data)
    } catch (error) {
      toast.error("Failed to load events")
      console.error("Error fetching events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [currentDate])

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

  const getEventsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return events.filter((event) => {
      const eventStart = new Date(event.startTime)
      const eventEnd = new Date(event.endTime)

      // Check if event overlaps with this day
      if (event.allDay) {
        return isSameDay(eventStart, date) || isSameDay(eventEnd, date) || (eventStart <= date && eventEnd >= date)
      }

      return (
        isSameDay(eventStart, date) ||
        isSameDay(eventEnd, date) ||
        (eventStart <= date && eventEnd >= date)
      )
    })
  }

  const handleDayClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(date)
    setEditingEvent(undefined)
    setIsFormOpen(true)
  }

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event)
    setSelectedDate(undefined)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingEvent(undefined)
    setSelectedDate(undefined)
  }

  const handleSuccess = () => {
    fetchEvents()
  }

  // Get today's events
  const todaysEvents = events.filter((event) => {
    const eventStart = new Date(event.startTime)
    return isSameDay(eventStart, today)
  })

  const getColorClass = (color?: string | null) => {
    if (!color) return "bg-blue-500"
    return color.startsWith("#") ? "" : `bg-${color}-500`
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
        <Button
          onClick={() => {
            setSelectedDate(new Date())
            setEditingEvent(undefined)
            setIsFormOpen(true)
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/20"
        >
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
                  const dayEvents = getEventsForDay(day)
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`aspect-square p-1 rounded-lg text-sm font-medium transition-all relative ${
                        isCurrentDay
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                          : "hover:bg-slate-800/50 text-white"
                      }`}
                    >
                      <div className="text-center">{day}</div>
                      {/* Event indicators */}
                      {dayEvents.length > 0 && (
                        <div className="flex justify-center gap-0.5 mt-1 flex-wrap">
                          {dayEvents.slice(0, 3).map((event, idx) => (
                            <div
                              key={event.id}
                              className={`size-1.5 rounded-full ${
                                event.color
                                  ? getColorClass(event.color) || ""
                                  : "bg-blue-500"
                              }`}
                              style={event.color?.startsWith("#") ? { backgroundColor: event.color } : undefined}
                              title={event.title}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-[8px] text-slate-400">+{dayEvents.length - 3}</div>
                          )}
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
                  {format(today, "EEEE, MMMM d, yyyy")}
                </p>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">Loading events...</p>
                </div>
              ) : todaysEvents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">No events scheduled for today</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {todaysEvents.map((event) => (
                    <EventCard key={event.id} event={event} onUpdate={handleSuccess} onEdit={handleEdit} />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Form Dialog */}
      <CalendarEventForm
        open={isFormOpen}
        onOpenChange={handleFormClose}
        event={editingEvent}
        defaultDate={selectedDate}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
