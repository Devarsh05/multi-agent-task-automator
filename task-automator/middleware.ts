import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const session = await auth()

  // Protect dashboard routes - require authentication
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect API routes - require authentication
  const protectedApiRoutes = [
    "/api/tasks",
    "/api/calendar",
    "/api/automate",
    "/api/notifications",
    "/api/reports",
  ]

  const isProtectedApiRoute = protectedApiRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedApiRoute && !session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/tasks/:path*",
    "/api/calendar/:path*",
    "/api/automate/:path*",
    "/api/notifications/:path*",
    "/api/reports/:path*",
  ],
}
