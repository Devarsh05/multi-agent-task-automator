import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const automateSchema = z.object({
  taskInput: z.string().min(1, "Task input is required"),
  agentType: z.enum(["PLANNER", "CALENDAR", "SUMMARIZER", "NOTIFICATIONS"]).optional(),
})

// POST /api/automate - Trigger automation agent
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = automateSchema.parse(body)

    // Create agent job
    const agentJob = await db.agentJob.create({
      data: {
        taskInput: validatedData.taskInput,
        agentType: validatedData.agentType || "PLANNER",
        status: "PENDING",
        userId: session.user.id,
      },
    })

    // TODO: In Phase 3, this will trigger actual AI agents
    // For now, we'll simulate the process
    // In the future, this will:
    // 1. Call AI agent service
    // 2. Process the task input
    // 3. Update the job status and result
    // 4. Create related tasks/events/notifications

    // Simulate processing (update status to RUNNING)
    await db.agentJob.update({
      where: { id: agentJob.id },
      data: { status: "RUNNING" },
    })

    // Return the job immediately (actual processing will happen asynchronously)
    return NextResponse.json(
      {
        jobId: agentJob.id,
        status: "RUNNING",
        message: "Automation job started. Processing will continue in the background.",
      },
      { status: 202 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating automation job:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}



