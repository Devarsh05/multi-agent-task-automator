import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  allDay: z.boolean().optional(),
  color: z.string().optional().nullable(),
})

// GET /api/calendar/[id] - Get a specific calendar event
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const event = await db.calendarEvent.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Error fetching calendar event:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/calendar/[id] - Update a calendar event
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const validatedData = updateEventSchema.parse(body)

    // Check if event exists and belongs to user
    const existingEvent = await db.calendarEvent.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Validate startTime and endTime if both are provided
    if (validatedData.startTime && validatedData.endTime) {
      const startTime = new Date(validatedData.startTime)
      const endTime = new Date(validatedData.endTime)

      if (endTime <= startTime) {
        return NextResponse.json(
          { error: "End time must be after start time" },
          { status: 400 }
        )
      }
    }

    const updateData: any = { ...validatedData }
    if (validatedData.startTime) {
      updateData.startTime = new Date(validatedData.startTime)
    }
    if (validatedData.endTime) {
      updateData.endTime = new Date(validatedData.endTime)
    }

    const event = await db.calendarEvent.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(event)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error updating calendar event:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/calendar/[id] - Delete a calendar event
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Check if event exists and belongs to user
    const event = await db.calendarEvent.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    await db.calendarEvent.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("Error deleting calendar event:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

