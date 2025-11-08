import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NotificationsPanel } from "@/components/notifications-panel"
import { Settings } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-slate-400 mt-1">Stay updated on all your tasks and events</p>
        </div>
        <Button
          variant="outline"
          className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Settings className="size-4 mr-2" />
          Preferences
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent</h2>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800/50">
              Mark all as read
            </Button>
          </div>
          <NotificationsPanel />
        </div>

        {/* Integration Settings */}
        <div className="space-y-4">
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4">Notification Channels</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Email</p>
                    <p className="text-xs text-slate-400">Daily summary</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Slack</p>
                    <p className="text-xs text-slate-400">Real-time updates</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Push</p>
                    <p className="text-xs text-slate-400">Browser notifications</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Enable
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4">Notification Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    Task completions
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    Upcoming events
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    AI agent updates
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    Weekly summaries
                  </span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
