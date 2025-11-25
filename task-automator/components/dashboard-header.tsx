"use client"

import { useSession, signOut } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Search, Menu, LogOut, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  const getUserInitials = (name?: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

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

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getUserInitials(session?.user?.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">{session?.user?.name || "User"}</p>
                  <p className="text-xs leading-none text-slate-400">{session?.user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem className="text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem
                className="text-red-400 hover:bg-slate-800 hover:text-red-300 cursor-pointer"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
