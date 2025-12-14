import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  dueDate: z.string().datetime().optional().nullable(),
})

// GET /api/tasks - Get all tasks for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")

    const where: any = {
      userId: session.user.id,
    }

    if (status && ["TODO", "IN_PROGRESS", "COMPLETED"].includes(status)) {
      where.status = status
    }

    if (priority && ["LOW", "MEDIUM", "HIGH"].includes(priority)) {
      where.priority = priority
    }

    const tasks = await db.task.findMany({
      where,
      orderBy: [
        { createdAt: "desc" },
      ],
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/tasks - Create a new task
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = createTaskSchema.parse(body)

    const task = await db.task.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        status: validatedData.status || "TODO",
        priority: validatedData.priority || "MEDIUM",
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        userId: session.user.id,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating task:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}



