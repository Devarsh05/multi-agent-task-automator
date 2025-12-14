"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  allDay: z.boolean().optional(),
  color: z.string().optional(),
}).refine((data) => {
  if (data.startTime && data.endTime) {
    return new Date(data.endTime) > new Date(data.startTime)
  }
  return true
}, {
  message: "End time must be after start time",
  path: ["endTime"],
})

type EventFormData = z.infer<typeof eventSchema>

interface CalendarEventFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event?: {
    id: string
    title: string
    description?: string | null
    startTime: string
    endTime: string
    allDay: boolean
    color?: string | null
  }
  defaultDate?: Date
  onSuccess: () => void
}

export function CalendarEventForm({ open, onOpenChange, event, defaultDate, onSuccess }: CalendarEventFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!event

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      startTime: event?.startTime ? formatDateTime(new Date(event.startTime)) : defaultDate ? formatDateTime(defaultDate) : "",
      endTime: event?.endTime ? formatDateTime(new Date(event.endTime)) : defaultDate ? formatDateTime(new Date(defaultDate.getTime() + 3600000)) : "",
      allDay: event?.allDay || false,
      color: event?.color || "#3b82f6",
    },
  })

  const allDay = watch("allDay")

  useEffect(() => {
    if (open) {
      const startDate = event?.startTime ? new Date(event.startTime) : defaultDate || new Date()
      const endDate = event?.endTime ? new Date(event.endTime) : defaultDate ? new Date(defaultDate.getTime() + 3600000) : new Date(Date.now() + 3600000)

      reset({
        title: event?.title || "",
        description: event?.description || "",
        startTime: formatDateTime(startDate),
        endTime: formatDateTime(endDate),
        allDay: event?.allDay || false,
        color: event?.color || "#3b82f6",
      })
    }
  }, [open, event, defaultDate, reset])

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true)
    try {
      const url = isEditing ? `/api/calendar/${event.id}` : "/api/calendar"
      const method = isEditing ? "PUT" : "POST"

      const body = {
        title: data.title,
        description: data.description || null,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
        allDay: data.allDay || false,
        color: data.color || null,
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save event")
      }

      toast.success(isEditing ? "Event updated successfully" : "Event created successfully")
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred")
      console.error("Error saving event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            {isEditing ? "Edit Event" : "Create New Event"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {isEditing ? "Update your event details" : "Add a new event to your calendar"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-300">
              Title *
            </Label>
            <Input
              id="title"
              {...register("title")}
              className="bg-slate-950/50 border-slate-800 text-white"
              placeholder="Enter event title"
            />
            {errors.title && <p className="text-sm text-red-400">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">
              Description
            </Label>
            <textarea
              id="description"
              {...register("description")}
              className="flex min-h-[80px] w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter event description"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allDay"
                {...register("allDay")}
                className="rounded border-slate-800"
              />
              <Label htmlFor="allDay" className="text-slate-300 cursor-pointer">
                All day event
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-slate-300">
                Start {allDay ? "Date" : "Date & Time"} *
              </Label>
              <Input
                id="startTime"
                type={allDay ? "date" : "datetime-local"}
                {...register("startTime")}
                className="bg-slate-950/50 border-slate-800 text-white"
              />
              {errors.startTime && <p className="text-sm text-red-400">{errors.startTime.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-slate-300">
                End {allDay ? "Date" : "Date & Time"} *
              </Label>
              <Input
                id="endTime"
                type={allDay ? "date" : "datetime-local"}
                {...register("endTime")}
                className="bg-slate-950/50 border-slate-800 text-white"
              />
              {errors.endTime && <p className="text-sm text-red-400">{errors.endTime.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-slate-300">
              Color
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="color"
                type="color"
                {...register("color")}
                className="h-10 w-20 bg-slate-950/50 border-slate-800"
              />
              <Input
                type="text"
                {...register("color")}
                className="flex-1 bg-slate-950/50 border-slate-800 text-white"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              {isLoading ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

