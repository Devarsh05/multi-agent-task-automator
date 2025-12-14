"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock, MoreHorizontal, Trash2, Edit } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { format } from "date-fns"

interface Task {
  id: string
  title: string
  description?: string | null
  status: "TODO" | "IN_PROGRESS" | "COMPLETED"
  priority: "LOW" | "MEDIUM" | "HIGH"
  dueDate?: string | null
  completedAt?: string | null
  createdAt: string
  updatedAt: string
}

interface TaskCardProps {
  task: Task
  onUpdate: () => void
  onEdit: (task: Task) => void
}

export function TaskCard({ task, onUpdate, onEdit }: TaskCardProps) {
  const handleStatusToggle = async () => {
    const newStatus = task.status === "COMPLETED" ? "TODO" : "COMPLETED"

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update task status")
      }

      toast.success(`Task marked as ${newStatus === "COMPLETED" ? "completed" : "to do"}`)
      onUpdate()
    } catch (error) {
      toast.error("Failed to update task status")
      console.error("Error updating task status:", error)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      toast.success("Task deleted successfully")
      onUpdate()
    } catch (error) {
      toast.error("Failed to delete task")
      console.error("Error deleting task:", error)
    }
  }

  const formatDueDate = (dateString: string | null | undefined) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const taskDate = new Date(date)
    taskDate.setHours(0, 0, 0, 0)

    if (taskDate.getTime() === today.getTime()) {
      return "Today"
    }

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    if (taskDate.getTime() === tomorrow.getTime()) {
      return "Tomorrow"
    }

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (taskDate.getTime() === yesterday.getTime()) {
      return "Yesterday"
    }

    if (taskDate < today) {
      return `Overdue (${format(date, "MMM d")})`
    }

    return format(date, "MMM d, yyyy")
  }

  const priorityColors = {
    HIGH: "bg-red-500/20 text-red-400 border-red-500/30",
    MEDIUM: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    LOW: "bg-slate-800/50 text-slate-400 border-slate-700/50",
  }

  const priorityLabels = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
  }

  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <button
            onClick={handleStatusToggle}
            className="mt-1 transition-transform hover:scale-110"
          >
            {task.status === "COMPLETED" ? (
              <CheckCircle2 className="size-5 text-green-400" />
            ) : (
              <Circle className="size-5 text-slate-600 hover:text-blue-400 transition-colors" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold text-white ${
                    task.status === "COMPLETED" ? "line-through opacity-50" : ""
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-white hover:bg-slate-800/50"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-900 border-slate-800" align="end">
                  <DropdownMenuItem
                    className="text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                    onClick={() => onEdit(task)}
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

            <div className="flex items-center gap-3 mt-4">
              <Badge className={priorityColors[task.priority]}>
                {priorityLabels[task.priority]}
              </Badge>
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="size-3" />
                  {formatDueDate(task.dueDate)}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


