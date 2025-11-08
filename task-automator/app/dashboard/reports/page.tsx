"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, CheckCircle2, Clock, Sparkles } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const weeklyData = [
  { day: "Mon", completed: 8, pending: 3 },
  { day: "Tue", completed: 12, pending: 2 },
  { day: "Wed", completed: 10, pending: 4 },
  { day: "Thu", completed: 15, pending: 1 },
  { day: "Fri", completed: 11, pending: 3 },
  { day: "Sat", completed: 5, pending: 2 },
  { day: "Sun", completed: 3, pending: 1 },
]

const productivityData = [
  { week: "Week 1", score: 65 },
  { week: "Week 2", score: 72 },
  { week: "Week 3", score: 78 },
  { week: "Week 4", score: 85 },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Reports & Summaries
          </h1>
          <p className="text-slate-400 mt-1">Track your productivity and task completion insights</p>
        </div>
        <Button
          variant="outline"
          className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Download className="size-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <TrendingUp className="size-4" />
              Productivity Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              85%
            </div>
            <p className="text-xs text-green-400 mt-1">+12% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Completed Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">64</div>
            <p className="text-xs text-slate-400 mt-1">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Clock className="size-4" />
              Avg. Completion Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">2.5h</div>
            <p className="text-xs text-green-400 mt-1">-30min improvement</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Sparkles className="size-4" />
              AI Automations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">156</div>
            <p className="text-xs text-slate-400 mt-1">Tasks automated</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Weekly Task Completion</CardTitle>
            <CardDescription className="text-slate-400">Completed vs pending tasks over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Productivity Trend</CardTitle>
            <CardDescription className="text-slate-400">Your productivity score over the past month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Generated Summary */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-blue-400" />
            <CardTitle className="text-white">AI-Generated Weekly Summary</CardTitle>
          </div>
          <CardDescription className="text-slate-400">Generated on {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/50">
            <h4 className="font-semibold text-white mb-2">Key Highlights</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Completed 64 tasks this week, marking a 15% increase from last week</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Average task completion time reduced by 30 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Your productivity peaked on Thursday with 15 completed tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>AI agents automated 156 tasks, saving approximately 10 hours of manual work</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="size-4 text-blue-400" />
              Recommendations
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Consider scheduling more focus time blocks in the morning when productivity is highest</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Weekend task completion is low - try batch processing administrative tasks on Fridays</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Task Categories Breakdown */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Task Categories</CardTitle>
          <CardDescription className="text-slate-400">Breakdown of completed tasks by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { category: "Meetings", count: 18, percentage: 28, color: "bg-blue-500" },
              { category: "Deep Work", count: 22, percentage: 34, color: "bg-purple-500" },
              { category: "Admin", count: 12, percentage: 19, color: "bg-pink-500" },
              { category: "Communication", count: 12, percentage: 19, color: "bg-green-500" },
            ].map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white font-medium">{item.category}</span>
                  <span className="text-slate-400">
                    {item.count} tasks ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} transition-all`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
