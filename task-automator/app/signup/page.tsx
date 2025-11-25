"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || "Failed to create account")
        return
      }

      toast.success("Account created successfully! Please sign in.")
      router.push("/login")
    } catch (error) {
      toast.error("An error occurred. Please try again.")
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Aurora effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="size-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TaskAI
            </span>
          </Link>
          <p className="text-slate-400 text-center">Create your account to get started</p>
        </div>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl text-white">Create an account</CardTitle>
            <CardDescription className="text-slate-400">
              Start automating your tasks with AI-powered agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Full name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 transition-colors"
                />
                {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 transition-colors"
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  {...register("password")}
                  className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 transition-colors"
                />
                {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-slate-300">
                  Confirm password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword")}
                  className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 transition-colors"
                />
                {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                size="lg"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <p className="text-xs text-slate-500 text-center">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-slate-400 text-center w-full">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
