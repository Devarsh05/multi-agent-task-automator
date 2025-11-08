"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Search, Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-6 py-4">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-800/50">
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Search tasks, agents, or settings..."
              className="pl-9 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <Bell className="size-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-blue-500 to-purple-600 border-0"
            >
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
