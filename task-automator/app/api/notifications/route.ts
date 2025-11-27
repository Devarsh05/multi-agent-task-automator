import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const createNotificationSchema = z.object({
  message: z.string().min(1, "Message is required"),
  type: z.enum(["INFO", "SUCCESS", "WARNING", "ERROR", "TASK_REMINDER", "AGENT_UPDATE"]).optional(),
  actionUrl: z.string().url().optional().nullable(),
})

// GET /api/notifications - Get all notifications for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const read = searchParams.get("read")
    const limit = searchParams.get("limit")

    const where: any = {
      userId: session.user.id,
    }

    if (read !== null) {
      where.read = read === "true"
    }

    const notifications = await db.notification.findMany({
      where,
      orderBy: [
        { createdAt: "desc" },
      ],
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/notifications - Create a new notification
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = createNotificationSchema.parse(body)

    const notification = await db.notification.create({
      data: {
        message: validatedData.message,
        type: validatedData.type || "INFO",
        actionUrl: validatedData.actionUrl,
        userId: session.user.id,
      },
    })

    return NextResponse.json(notification, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating notification:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}


