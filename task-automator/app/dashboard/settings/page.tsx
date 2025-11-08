import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-slate-400 mt-1">Manage your account and application preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Profile</CardTitle>
          <CardDescription className="text-slate-400">Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Full name
              </Label>
              <Input
                id="name"
                defaultValue="John Doe"
                className="bg-slate-950/50 border-slate-800 text-white focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="john@example.com"
                className="bg-slate-950/50 border-slate-800 text-white focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/20">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Integrations</CardTitle>
          <CardDescription className="text-slate-400">Manage connected services and applications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Google Calendar", status: "connected", description: "Sync tasks and events" },
            { name: "Slack", status: "disconnected", description: "Receive notifications" },
            { name: "Email", status: "connected", description: "Daily summaries and alerts" },
          ].map((integration) => (
            <div
              key={integration.name}
              className="flex items-center justify-between p-4 border border-slate-800/50 rounded-lg bg-slate-950/30"
            >
              <div>
                <p className="font-medium text-white">{integration.name}</p>
                <p className="text-sm text-slate-400">{integration.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={integration.status === "connected" ? "secondary" : "outline"}
                  className={
                    integration.status === "connected"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-slate-800/50 text-slate-400 border-slate-700/50"
                  }
                >
                  {integration.status}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  {integration.status === "connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">AI Agent Preferences</CardTitle>
          <CardDescription className="text-slate-400">Configure how AI agents work for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <p className="text-sm font-medium text-white">Auto-schedule tasks</p>
                <p className="text-xs text-slate-400">Let AI automatically add tasks to your calendar</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <p className="text-sm font-medium text-white">Smart notifications</p>
                <p className="text-xs text-slate-400">AI determines optimal notification timing</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <p className="text-sm font-medium text-white">Weekly summaries</p>
                <p className="text-xs text-slate-400">Receive AI-generated productivity reports</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
