import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, CheckCircle2, Circle, Clock } from "lucide-react"

export default function TasksPage() {
  const tasks = [
    {
      id: 1,
      title: "Review Q4 reports",
      description: "Analyze quarterly performance metrics",
      status: "in-progress",
      priority: "high",
      dueDate: "Today",
    },
    {
      id: 2,
      title: "Update project documentation",
      description: "Add API endpoints and usage examples",
      status: "todo",
      priority: "medium",
      dueDate: "Tomorrow",
    },
    {
      id: 3,
      title: "Team standup meeting",
      description: "Daily sync with development team",
      status: "completed",
      priority: "low",
      dueDate: "Completed",
    },
    {
      id: 4,
      title: "Client presentation prep",
      description: "Prepare slides for quarterly review",
      status: "in-progress",
      priority: "high",
      dueDate: "Today",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tasks
          </h1>
          <p className="text-slate-400 mt-1">Manage and track all your tasks</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/20">
          <Plus className="size-4 mr-2" />
          New Task
        </Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <button className="mt-1">
                  {task.status === "completed" ? (
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
                          task.status === "completed" ? "line-through opacity-50" : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white hover:bg-slate-800/50"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                      className={
                        task.priority === "high"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : task.priority === "medium"
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            : "bg-slate-800/50 text-slate-400 border-slate-700/50"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="size-3" />
                      {task.dueDate}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
