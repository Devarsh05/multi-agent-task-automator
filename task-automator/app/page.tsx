import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Bot, Calendar, Bell } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background premium-bg flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground tracking-tight">AI Task Automator</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="btn-glow bg-primary hover:bg-primary/90 text-sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground text-balance leading-[1.1] tracking-tight">
              Automate <span className="gradient-text">tasks</span> with intelligent AI agents
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Watch multiple AI agents work together in real-time to break down complex tasks, schedule your calendar,
              and manage your entire workflow automatically.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/signup">
              <Button
                size="lg"
                className="btn-glow text-base px-8 py-6 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Start automating
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-full bg-transparent border-white/10 hover:bg-white/5"
              >
                Watch demo
              </Button>
            </Link>
          </div>

          <div className="pt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent blur-3xl" />
            <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-yellow-500/80" />
                  <div className="size-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                  <span>Overview</span>
                  <span className="text-foreground">Automate</span>
                  <span>Calendar</span>
                  <span>Reports</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Welcome back, <span className="text-muted-foreground">Sarah</span>
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center gap-2">
                      <Bot className="size-3" />
                      <span>4 AI Agents Active</span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                      89% Automated
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/5 text-muted-foreground text-sm font-medium">
                      24 Tasks Today
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="glass-card rounded-2xl p-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Zap className="size-4 text-primary" />
                      </div>
                      <span className="text-4xl font-bold text-foreground">47</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Tasks automated</p>
                  </div>

                  <div className="glass-card rounded-2xl p-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Calendar className="size-4 text-blue-400" />
                      </div>
                      <span className="text-4xl font-bold text-foreground">18</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Events scheduled</p>
                  </div>

                  <div className="glass-card rounded-2xl p-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Bell className="size-4 text-purple-400" />
                      </div>
                      <span className="text-4xl font-bold text-foreground">12</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Smart reminders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>© 2025 AI Task Automator. All rights reserved.</div>
            <div className="flex items-center gap-8">
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
