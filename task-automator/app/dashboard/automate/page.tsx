"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Brain, Calendar, FileText, Bell, CheckCircle2, Loader2 } from "lucide-react"

type AgentStatus = "idle" | "working" | "completed"

interface Agent {
  id: string
  name: string
  icon: typeof Brain
  status: AgentStatus
  progress: string
}

export default function AutomatePage() {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "planner",
      name: "Planner Agent",
      icon: Brain,
      status: "idle",
      progress: "Waiting to start...",
    },
    {
      id: "calendar",
      name: "Calendar Agent",
      icon: Calendar,
      status: "idle",
      progress: "Waiting to start...",
    },
    {
      id: "summarizer",
      name: "Summarizer Agent",
      icon: FileText,
      status: "idle",
      progress: "Waiting to start...",
    },
    {
      id: "notifications",
      name: "Notifications Agent",
      icon: Bell,
      status: "idle",
      progress: "Waiting to start...",
    },
  ])

  const [generatedTasks, setGeneratedTasks] = useState<string[]>([])

  const handleAutomate = async () => {
    if (!input.trim()) return

    setIsProcessing(true)
    setGeneratedTasks([])

    // Simulate Planner Agent
    await new Promise((resolve) => setTimeout(resolve, 500))
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === "planner" ? { ...agent, status: "working", progress: "Breaking down your task..." } : agent,
      ),
    )

    await new Promise((resolve) => setTimeout(resolve, 1500))
    const mockTasks = [
      "Morning focus time (9:00 AM - 11:00 AM)",
      "Review emails and respond (11:00 AM - 11:30 AM)",
      "Lunch break (12:00 PM - 1:00 PM)",
      "Deep work session (1:00 PM - 3:00 PM)",
      "Team sync meeting (3:00 PM - 3:30 PM)",
      "Wrap up and plan tomorrow (4:30 PM - 5:00 PM)",
    ]
    setGeneratedTasks(mockTasks)
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === "planner" ? { ...agent, status: "completed", progress: "Generated 6 tasks" } : agent,
      ),
    )

    // Simulate Calendar Agent
    await new Promise((resolve) => setTimeout(resolve, 500))
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === "calendar" ? { ...agent, status: "working", progress: "Scheduling events..." } : agent,
      ),
    )

    await new Promise((resolve) => setTimeout(resolve, 1500))
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === "calendar" ? { ...agent, status: "completed", progress: "Added 6 events to calendar" } : agent,
      ),
    )

    // Simulate Summarizer Agent
    await new Promise((resolve) => setTimeout(resolve, 500))
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === "summarizer" ? { ...agent, status: "working", progress: "Creating summary..." } : agent,
      ),
    )

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === "summarizer" ? { ...agent, status: "completed", progress: "Summary generated" } : agent,
      ),
    )

    // Simulate Notifications Agent
    await new Promise((resolve) => setTimeout(resolve, 500))
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === "notifications" ? { ...agent, status: "working", progress: "Setting up reminders..." } : agent,
      ),
    )

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === "notifications" ? { ...agent, status: "completed", progress: "6 reminders scheduled" } : agent,
      ),
    )

    setIsProcessing(false)
  }

  const resetAgents = () => {
    setAgents((prev) =>
      prev.map((agent) => ({
        ...agent,
        status: "idle",
        progress: "Waiting to start...",
      })),
    )
    setGeneratedTasks([])
    setInput("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Task Automation
        </h1>
        <p className="text-slate-400 mt-1">Let AI agents break down, schedule, and manage your tasks automatically</p>
      </div>

      {/* Task Input */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="size-5 text-blue-400" />
            What would you like to accomplish?
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter a high-level task and watch AI agents work their magic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Try "Plan my week", "Organize team meeting", or "Prepare for launch"'
              className="flex-1 px-4 py-3 rounded-lg border border-slate-800 bg-slate-950/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isProcessing}
            />
            <Button
              size="lg"
              className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/20"
              onClick={handleAutomate}
              disabled={isProcessing || !input.trim()}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Sparkles className="size-4 mr-2" />
                  Automate
                </>
              )}
            </Button>
          </div>

          {agents.some((a) => a.status !== "idle") && (
            <Button
              variant="outline"
              onClick={resetAgents}
              disabled={isProcessing}
              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Reset
            </Button>
          )}
        </CardContent>
      </Card>

      {/* AI Agents Status */}
      <div className="grid gap-4 md:grid-cols-2">
        {agents.map((agent) => {
          const Icon = agent.icon
          return (
            <Card key={agent.id} className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      agent.status === "working"
                        ? "bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20"
                        : agent.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-800/50 text-slate-500"
                    }`}
                  >
                    {agent.status === "working" ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : agent.status === "completed" ? (
                      <CheckCircle2 className="size-5" />
                    ) : (
                      <Icon className="size-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{agent.name}</h3>
                      <Badge
                        variant={
                          agent.status === "working"
                            ? "default"
                            : agent.status === "completed"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          agent.status === "working"
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            : agent.status === "completed"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-slate-800/50 text-slate-400 border-slate-700/50"
                        }
                      >
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{agent.progress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Generated Tasks */}
      {generatedTasks.length > 0 && (
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Generated Task Breakdown</CardTitle>
            <CardDescription className="text-slate-400">Here's how your day has been planned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-800/50 bg-slate-950/30 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="size-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{task}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-green-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
