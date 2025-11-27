"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react"
import { TaskCard } from "./components/TaskCard"
import { TaskForm } from "./components/TaskForm"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate" | "priority">("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.append("status", statusFilter)
      if (priorityFilter) params.append("priority", priorityFilter)

      const response = await fetch(`/api/tasks?${params.toString()}`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const data = await response.json()
      setTasks(data)
    } catch (error) {
      toast.error("Failed to load tasks")
      console.error("Error fetching tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [statusFilter, priorityFilter])

  useEffect(() => {
    let filtered = [...tasks]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "dueDate":
          const aDate = a.dueDate ? new Date(a.dueDate).getTime() : 0
          const bDate = b.dueDate ? new Date(b.dueDate).getTime() : 0
          comparison = aDate - bDate
          break
        case "priority":
          const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 }
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority]
          break
        case "createdAt":
        default:
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredTasks(filtered)
  }, [tasks, searchQuery, sortBy, sortOrder])

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingTask(undefined)
  }

  const handleSuccess = () => {
    fetchTasks()
  }

  const clearFilters = () => {
    setStatusFilter(null)
    setPriorityFilter(null)
    setSearchQuery("")
  }

  const hasActiveFilters = statusFilter || priorityFilter || searchQuery

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tasks
          </h1>
          <p className="text-slate-400 mt-1">Manage and track all your tasks</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/20"
        >
          <Plus className="size-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/50">
              <Filter className="size-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-900 border-slate-800" align="end">
            <DropdownMenuLabel className="text-slate-300">Status</DropdownMenuLabel>
            <DropdownMenuItem
              className={statusFilter === null ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setStatusFilter(null)}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              className={statusFilter === "TODO" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setStatusFilter("TODO")}
            >
              To Do
            </DropdownMenuItem>
            <DropdownMenuItem
              className={statusFilter === "IN_PROGRESS" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setStatusFilter("IN_PROGRESS")}
            >
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              className={statusFilter === "COMPLETED" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setStatusFilter("COMPLETED")}
            >
              Completed
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuLabel className="text-slate-300">Priority</DropdownMenuLabel>
            <DropdownMenuItem
              className={priorityFilter === null ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setPriorityFilter(null)}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              className={priorityFilter === "HIGH" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setPriorityFilter("HIGH")}
            >
              High
            </DropdownMenuItem>
            <DropdownMenuItem
              className={priorityFilter === "MEDIUM" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setPriorityFilter("MEDIUM")}
            >
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem
              className={priorityFilter === "LOW" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setPriorityFilter("LOW")}
            >
              Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/50">
              <ArrowUpDown className="size-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-900 border-slate-800" align="end">
            <DropdownMenuLabel className="text-slate-300">Sort By</DropdownMenuLabel>
            <DropdownMenuItem
              className={sortBy === "createdAt" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setSortBy("createdAt")}
            >
              Date Created
            </DropdownMenuItem>
            <DropdownMenuItem
              className={sortBy === "dueDate" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setSortBy("dueDate")}
            >
              Due Date
            </DropdownMenuItem>
            <DropdownMenuItem
              className={sortBy === "priority" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setSortBy("priority")}
            >
              Priority
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem
              className={sortOrder === "asc" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setSortOrder("asc")}
            >
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem
              className={sortOrder === "desc" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"}
              onClick={() => setSortOrder("desc")}
            >
              Descending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-slate-400 hover:text-white"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Tasks List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50">
          <CardContent className="p-12 text-center">
            <p className="text-slate-400 text-lg">
              {tasks.length === 0
                ? "No tasks yet. Create your first task!"
                : "No tasks match your filters."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={handleSuccess} onEdit={handleEdit} />
          ))}
        </div>
      )}

      {/* Task Form Dialog */}
      <TaskForm
        open={isFormOpen}
        onOpenChange={handleFormClose}
        task={editingTask}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
