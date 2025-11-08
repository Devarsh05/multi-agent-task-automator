import { Button } from "@/components/ui/button"
import { ArrowUpRight, Calendar, CheckCircle2, Clock, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8 premium-bg min-h-screen p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          Welcome back, <span className="gradient-text">John</span>
        </h1>
        <p className="text-muted-foreground text-lg">Here's what's happening with your tasks today</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-2xl p-6 space-y-3 hover:bg-white/5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Clock className="size-5 text-primary" />
            </div>
            <TrendingUp className="size-4 text-green-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">12</div>
            <p className="text-sm text-muted-foreground mt-1">Active Tasks</p>
          </div>
          <p className="text-xs text-green-400">+3 from last week</p>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-3 hover:bg-white/5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="size-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-green-400" />
            </div>
            <TrendingUp className="size-4 text-green-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">48</div>
            <p className="text-sm text-muted-foreground mt-1">Completed</p>
          </div>
          <p className="text-xs text-muted-foreground">This week</p>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-3 hover:bg-white/5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="size-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Calendar className="size-5 text-accent" />
            </div>
            <div className="size-2 rounded-full bg-accent animate-pulse" />
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">8</div>
            <p className="text-sm text-muted-foreground mt-1">Upcoming</p>
          </div>
          <p className="text-xs text-muted-foreground">Next 7 days</p>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-3 hover:bg-white/5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="size-5 text-white" />
            </div>
            <TrendingUp className="size-4 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">156</div>
            <p className="text-sm text-muted-foreground mt-1">AI Actions</p>
          </div>
          <p className="text-xs text-primary">Tasks automated</p>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-8">
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl font-bold text-foreground">Quick Task Input</h2>
          <p className="text-muted-foreground">Tell me what you want to accomplish and I'll break it down</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder='Try "Plan my week" or "Organize team meeting"'
            className="flex-1 px-6 py-4 rounded-2xl border border-white/10 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <Button
            size="lg"
            className="btn-glow px-8 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Sparkles className="size-5 mr-2" />
            Start
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Tasks</h2>
            <Link href="/dashboard/tasks">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View all
                <ArrowUpRight className="size-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-5">
            {[
              { title: "Review Q4 reports", status: "In Progress", time: "2h ago", color: "primary" },
              { title: "Team standup meeting", status: "Completed", time: "4h ago", color: "green" },
              { title: "Update project documentation", status: "Pending", time: "1d ago", color: "muted" },
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div
                  className={`size-2 rounded-full mt-2 ${
                    task.color === "green"
                      ? "bg-green-500"
                      : task.color === "primary"
                        ? "bg-primary"
                        : "bg-muted-foreground"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-1">{task.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {task.status} • {task.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Today's Schedule</h2>
            <Link href="/dashboard/calendar">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View calendar
                <ArrowUpRight className="size-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-5">
            {[
              { title: "Morning focus time", time: "9:00 AM - 11:00 AM" },
              { title: "Client presentation", time: "2:00 PM - 3:00 PM" },
              { title: "Weekly planning session", time: "4:00 PM - 5:00 PM" },
            ].map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-4 pb-5 border-b border-white/5 last:border-0 last:pb-0 p-4 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="size-2 rounded-full bg-primary mt-2 animate-pulse" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-1">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
