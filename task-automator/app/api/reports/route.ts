import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

// GET /api/reports - Get analytics and reports data
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const dateFilter: any = {}
    if (startDate) {
      dateFilter.gte = new Date(startDate)
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate)
    }

    // Get task statistics
    const totalTasks = await db.task.count({
      where: {
        userId: session.user.id,
        ...(Object.keys(dateFilter).length > 0 && {
          createdAt: dateFilter,
        }),
      },
    })

    const completedTasks = await db.task.count({
      where: {
        userId: session.user.id,
        status: "COMPLETED",
        ...(Object.keys(dateFilter).length > 0 && {
          completedAt: dateFilter,
        }),
      },
    })

    const inProgressTasks = await db.task.count({
      where: {
        userId: session.user.id,
        status: "IN_PROGRESS",
      },
    })

    const todoTasks = await db.task.count({
      where: {
        userId: session.user.id,
        status: "TODO",
      },
    })

    // Get tasks by priority
    const tasksByPriority = await db.task.groupBy({
      by: ["priority"],
      where: {
        userId: session.user.id,
        ...(Object.keys(dateFilter).length > 0 && {
          createdAt: dateFilter,
        }),
      },
      _count: true,
    })

    // Get calendar events count
    const totalEvents = await db.calendarEvent.count({
      where: {
        userId: session.user.id,
        ...(Object.keys(dateFilter).length > 0 && {
          createdAt: dateFilter,
        }),
      },
    })

    // Get agent jobs statistics
    const totalAgentJobs = await db.agentJob.count({
      where: {
        userId: session.user.id,
        ...(Object.keys(dateFilter).length > 0 && {
          createdAt: dateFilter,
        }),
      },
    })

    const completedAgentJobs = await db.agentJob.count({
      where: {
        userId: session.user.id,
        status: "COMPLETED",
        ...(Object.keys(dateFilter).length > 0 && {
          completedAt: dateFilter,
        }),
      },
    })

    // Get unread notifications count
    const unreadNotifications = await db.notification.count({
      where: {
        userId: session.user.id,
        read: false,
      },
    })

    // Calculate completion rate
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

    // Get tasks completed over time (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const tasksCompletedOverTime = await db.task.findMany({
      where: {
        userId: session.user.id,
        status: "COMPLETED",
        completedAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        completedAt: true,
      },
      orderBy: {
        completedAt: "asc",
      },
    })

    // Group by date
    const tasksByDate = tasksCompletedOverTime.reduce((acc, task) => {
      if (!task.completedAt) return acc
      const date = task.completedAt.toISOString().split("T")[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      summary: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        todoTasks,
        totalEvents,
        totalAgentJobs,
        completedAgentJobs,
        unreadNotifications,
        completionRate: Math.round(completionRate * 100) / 100,
      },
      tasksByPriority: tasksByPriority.map((item) => ({
        priority: item.priority,
        count: item._count,
      })),
      tasksCompletedOverTime: Object.entries(tasksByDate).map(([date, count]) => ({
        date,
        count,
      })),
    })
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}


