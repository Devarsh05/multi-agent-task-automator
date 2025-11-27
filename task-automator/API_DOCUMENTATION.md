# API Documentation

All API routes require authentication. Include the session cookie in requests, or use `fetch` with `credentials: 'include'` in the browser.

Base URL: `http://localhost:3000/api`

## Tasks API

### GET /api/tasks
Get all tasks for the authenticated user.

**Query Parameters:**
- `status` (optional): Filter by status (`TODO`, `IN_PROGRESS`, `COMPLETED`)
- `priority` (optional): Filter by priority (`LOW`, `MEDIUM`, `HIGH`)

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string | null",
    "status": "TODO" | "IN_PROGRESS" | "COMPLETED",
    "priority": "LOW" | "MEDIUM" | "HIGH",
    "dueDate": "ISO date string | null",
    "completedAt": "ISO date string | null",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string",
    "userId": "string"
  }
]
```

### POST /api/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "status": "TODO" | "IN_PROGRESS" | "COMPLETED" (optional, default: "TODO"),
  "priority": "LOW" | "MEDIUM" | "HIGH" (optional, default: "MEDIUM"),
  "dueDate": "ISO date string (optional)"
}
```

### GET /api/tasks/[id]
Get a specific task by ID.

### PUT /api/tasks/[id]
Update a task.

**Request Body:** (all fields optional)
```json
{
  "title": "string",
  "description": "string | null",
  "status": "TODO" | "IN_PROGRESS" | "COMPLETED",
  "priority": "LOW" | "MEDIUM" | "HIGH",
  "dueDate": "ISO date string | null"
}
```

**Note:** If status is changed to `COMPLETED`, `completedAt` is automatically set. If changed from `COMPLETED` to another status, `completedAt` is cleared.

### DELETE /api/tasks/[id]
Delete a task.

---

## Calendar API

### GET /api/calendar
Get all calendar events for the authenticated user.

**Query Parameters:**
- `startDate` (optional): Filter events starting from this date (ISO string)
- `endDate` (optional): Filter events ending before this date (ISO string)

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string | null",
    "startTime": "ISO date string",
    "endTime": "ISO date string",
    "allDay": "boolean",
    "color": "string | null",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string",
    "userId": "string"
  }
]
```

### POST /api/calendar
Create a new calendar event.

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "startTime": "ISO date string (required)",
  "endTime": "ISO date string (required)",
  "allDay": "boolean (optional, default: false)",
  "color": "string (optional)"
}
```

**Validation:** `endTime` must be after `startTime`.

### GET /api/calendar/[id]
Get a specific calendar event by ID.

### PUT /api/calendar/[id]
Update a calendar event.

**Request Body:** (all fields optional)
```json
{
  "title": "string",
  "description": "string | null",
  "startTime": "ISO date string",
  "endTime": "ISO date string",
  "allDay": "boolean",
  "color": "string | null"
}
```

### DELETE /api/calendar/[id]
Delete a calendar event.

---

## Notifications API

### GET /api/notifications
Get all notifications for the authenticated user.

**Query Parameters:**
- `read` (optional): Filter by read status (`true` or `false`)
- `limit` (optional): Limit number of results

**Response:**
```json
[
  {
    "id": "string",
    "message": "string",
    "type": "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "TASK_REMINDER" | "AGENT_UPDATE",
    "read": "boolean",
    "actionUrl": "string | null",
    "createdAt": "ISO date string",
    "userId": "string"
  }
]
```

### POST /api/notifications
Create a new notification.

**Request Body:**
```json
{
  "message": "string (required)",
  "type": "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "TASK_REMINDER" | "AGENT_UPDATE" (optional, default: "INFO"),
  "actionUrl": "string URL (optional)"
}
```

### PUT /api/notifications/[id]
Mark notification as read/unread.

**Request Body:**
```json
{
  "read": "boolean (optional, default: true)"
}
```

### DELETE /api/notifications/[id]
Delete a notification.

---

## Automate API

### POST /api/automate
Trigger an automation agent job.

**Request Body:**
```json
{
  "taskInput": "string (required)",
  "agentType": "PLANNER" | "CALENDAR" | "SUMMARIZER" | "NOTIFICATIONS" (optional, default: "PLANNER")
}
```

**Response:**
```json
{
  "jobId": "string",
  "status": "RUNNING",
  "message": "Automation job started. Processing will continue in the background."
}
```

**Note:** Currently creates a job record. In Phase 3, this will trigger actual AI agent processing.

---

## Reports API

### GET /api/reports
Get analytics and reports data.

**Query Parameters:**
- `startDate` (optional): Start date for filtering (ISO string)
- `endDate` (optional): End date for filtering (ISO string)

**Response:**
```json
{
  "summary": {
    "totalTasks": "number",
    "completedTasks": "number",
    "inProgressTasks": "number",
    "todoTasks": "number",
    "totalEvents": "number",
    "totalAgentJobs": "number",
    "completedAgentJobs": "number",
    "unreadNotifications": "number",
    "completionRate": "number (percentage)"
  },
  "tasksByPriority": [
    {
      "priority": "LOW" | "MEDIUM" | "HIGH",
      "count": "number"
    }
  ],
  "tasksCompletedOverTime": [
    {
      "date": "YYYY-MM-DD",
      "count": "number"
    }
  ]
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": [
    {
      "path": ["fieldName"],
      "message": "Error message"
    }
  ]
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Example Usage

### Fetching tasks (Client Component)
```typescript
const response = await fetch('/api/tasks', {
  credentials: 'include',
})
const tasks = await response.json()
```

### Creating a task
```typescript
const response = await fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    title: 'Complete project',
    description: 'Finish the multi-agent task automator',
    priority: 'HIGH',
    dueDate: new Date().toISOString(),
  }),
})
const task = await response.json()
```

### Updating a task
```typescript
const response = await fetch(`/api/tasks/${taskId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    status: 'COMPLETED',
  }),
})
const updatedTask = await response.json()
```

---

## Next Steps

1. **Connect Frontend**: Update dashboard pages to use these API endpoints
2. **Add Loading States**: Implement loading indicators for async operations
3. **Error Handling**: Add user-friendly error messages
4. **Optimistic Updates**: Update UI immediately, then sync with server
5. **Real-time Updates**: Add WebSocket/SSE for live updates (Phase 4)


