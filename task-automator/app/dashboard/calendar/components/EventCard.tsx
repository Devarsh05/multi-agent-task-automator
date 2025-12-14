"use client"

import { Clock, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { format, formatDistanceToNow } from "date-fns"

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

interface EventCardProps {
  event: CalendarEvent
  onUpdate: () => void
  onEdit: (event: CalendarEvent) => void
}

export function EventCard({ event, onUpdate, onEdit }: EventCardProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return
    }

    try {
      const response = await fetch(`/api/calendar/${event.id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete event")
      }

      toast.success("Event deleted successfully")
      onUpdate()
    } catch (error) {
      toast.error("Failed to delete event")
      console.error("Error deleting event:", error)
    }
  }

  const formatEventTime = () => {
    const start = new Date(event.startTime)
    const end = new Date(event.endTime)

    if (event.allDay) {
      const startDate = format(start, "MMM d")
      const endDate = format(end, "MMM d")
      return startDate === endDate ? startDate : `${startDate} - ${endDate}`
    }

    const startTime = format(start, "h:mm a")
    const endTime = format(end, "h:mm a")
    const startDate = format(start, "MMM d")
    const endDate = format(end, "MMM d")

    if (startDate === endDate) {
      return `${startDate} • ${startTime} - ${endTime}`
    }

    return `${startDate} ${startTime} - ${endDate} ${endTime}`
  }

  const getColorClass = (color?: string | null) => {
    if (!color) return "bg-blue-500"
    return color.startsWith("#") ? "" : `bg-${color}-500`
  }

  return (
    <div className="p-3 rounded-lg border border-slate-800/50 bg-slate-950/30 hover:bg-slate-800/30 transition-colors group">
      <div className="flex items-start gap-3">
        <div
          className={`size-1.5 rounded-full mt-2 ${
            event.color
              ? getColorClass(event.color) || ""
              : "bg-blue-500"
          }`}
          style={event.color?.startsWith("#") ? { backgroundColor: event.color } : undefined}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white mb-1 truncate">{event.title}</p>
              {event.description && (
                <p className="text-xs text-slate-400 mb-2 line-clamp-2">{event.description}</p>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="size-3" />
                {formatEventTime()}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-800" align="end">
                <DropdownMenuItem
                  className="text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                  onClick={() => onEdit(event)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-400 hover:bg-slate-800 hover:text-red-300 cursor-pointer"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

