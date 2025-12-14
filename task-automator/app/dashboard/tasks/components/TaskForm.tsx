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

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.string().optional(),
})

type TaskFormData = z.infer<typeof taskSchema>

interface TaskFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: {
    id: string
    title: string
    description?: string | null
    status: "TODO" | "IN_PROGRESS" | "COMPLETED"
    priority: "LOW" | "MEDIUM" | "HIGH"
    dueDate?: string | null
  }
  onSuccess: () => void
}

export function TaskForm({ open, onOpenChange, task, onSuccess }: TaskFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!task

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "TODO",
      priority: task?.priority || "MEDIUM",
      dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "TODO",
        priority: task?.priority || "MEDIUM",
        dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
      })
    }
  }, [open, task, reset])

  const onSubmit = async (data: TaskFormData) => {
    setIsLoading(true)
    try {
      const url = isEditing ? `/api/tasks/${task.id}` : "/api/tasks"
      const method = isEditing ? "PUT" : "POST"

      const body: any = {
        title: data.title,
        description: data.description || null,
        status: data.status,
        priority: data.priority,
      }

      if (data.dueDate) {
        body.dueDate = new Date(data.dueDate).toISOString()
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
        throw new Error(error.error || "Failed to save task")
      }

      toast.success(isEditing ? "Task updated successfully" : "Task created successfully")
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred")
      console.error("Error saving task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            {isEditing ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {isEditing ? "Update your task details" : "Add a new task to your list"}
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
              placeholder="Enter task title"
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
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-slate-300">
                Status
              </Label>
              <select
                id="status"
                {...register("status")}
                className="flex h-9 w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-1 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-slate-300">
                Priority
              </Label>
              <select
                id="priority"
                {...register("priority")}
                className="flex h-9 w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-1 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-slate-300">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate")}
              className="bg-slate-950/50 border-slate-800 text-white"
            />
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
              {isLoading ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


