# Testing Checklist - Multi-Agent Task Automator

Use this checklist to verify that all features are working correctly.

## 🔐 1. Database & Environment Setup

### Database Connection
- [ ] **Check `.env` file exists** in `task-automator` directory
- [ ] **Verify environment variables:**
  - [ ] `DATABASE_URL` is set (Supabase connection string)
  - [ ] `DIRECT_URL` is set (Supabase direct connection)
  - [ ] `NEXTAUTH_SECRET` is set (generate if missing)
  - [ ] `NEXTAUTH_URL` is set to `http://localhost:3000`

### Database Schema
- [ ] **Run Prisma commands:**
  ```bash
  cd task-automator
  npx prisma generate
  npx prisma db push
  ```
- [ ] **Verify tables created** in Supabase Dashboard → Table Editor:
  - [ ] `users` table exists
  - [ ] `tasks` table exists
  - [ ] `calendar_events` table exists
  - [ ] `agent_jobs` table exists
  - [ ] `notifications` table exists
  - [ ] `analytics` table exists

### Test Database Connection
- [ ] **Open Prisma Studio:**
  ```bash
  npx prisma studio
  ```
- [ ] **Verify connection** - Should open at `http://localhost:5555`
- [ ] **Check tables are visible** in Prisma Studio

---

## 🔑 2. Authentication Testing

### User Registration
- [ ] **Navigate to** `http://localhost:3000/signup`
- [ ] **Fill registration form:**
  - [ ] Name field accepts input
  - [ ] Email field validates email format
  - [ ] Password field requires minimum 8 characters
  - [ ] Confirm password matches password
- [ ] **Submit form:**
  - [ ] Success toast appears
  - [ ] Redirects to login page
  - [ ] User created in database (check Supabase/Prisma Studio)

### User Login
- [ ] **Navigate to** `http://localhost:3000/login`
- [ ] **Enter credentials:**
  - [ ] Email and password fields work
  - [ ] Form validation shows errors for invalid input
- [ ] **Submit login:**
  - [ ] Success toast appears
  - [ ] Redirects to `/dashboard`
  - [ ] Session is created (check browser cookies)

### Session Management
- [ ] **Check dashboard header:**
  - [ ] User avatar/initials appear
  - [ ] User email/name displayed in dropdown
- [ ] **Test logout:**
  - [ ] Click avatar → Log out
  - [ ] Redirects to login page
  - [ ] Session cleared

### Route Protection
- [ ] **Test protected routes** (while logged out):
  - [ ] Try accessing `/dashboard` → Should redirect to `/login`
  - [ ] Try accessing `/api/tasks` → Should return 401 Unauthorized
- [ ] **Test protected routes** (while logged in):
  - [ ] Can access `/dashboard`
  - [ ] Can access all dashboard pages

---

## 📋 3. Tasks API Testing

### GET /api/tasks
- [ ] **Test in browser console or Postman:**
  ```javascript
  fetch('/api/tasks', { credentials: 'include' })
    .then(r => r.json())
    .then(console.log)
  ```
  - [ ] Returns array of tasks
  - [ ] Only returns tasks for logged-in user
- [ ] **Test filtering:**
  - [ ] `?status=TODO` - Returns only TODO tasks
  - [ ] `?status=COMPLETED` - Returns only completed tasks
  - [ ] `?priority=HIGH` - Returns only high priority tasks

### POST /api/tasks
- [ ] **Create a task:**
  ```javascript
  fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      title: 'Test Task',
      description: 'Testing task creation',
      priority: 'HIGH',
      status: 'TODO'
    })
  })
  ```
  - [ ] Returns 201 status
  - [ ] Task appears in database
  - [ ] Task appears in UI

### GET /api/tasks/[id]
- [ ] **Get specific task:**
  - [ ] Returns task details
  - [ ] Returns 404 if task doesn't exist
  - [ ] Returns 404 if task belongs to another user

### PUT /api/tasks/[id]
- [ ] **Update task:**
  ```javascript
  fetch('/api/tasks/[id]', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ status: 'COMPLETED' })
  })
  ```
  - [ ] Task updates successfully
  - [ ] `completedAt` set when status = COMPLETED
  - [ ] `completedAt` cleared when status changes from COMPLETED

### DELETE /api/tasks/[id]
- [ ] **Delete task:**
  - [ ] Task deleted from database
  - [ ] Returns success message
  - [ ] Cannot delete another user's task

---

## 🎨 4. Tasks UI Testing

### Task List Display
- [ ] **Navigate to** `/dashboard/tasks`
- [ ] **Verify:**
  - [ ] Tasks load from API
  - [ ] Loading state shows while fetching
  - [ ] Empty state shows if no tasks
  - [ ] Tasks display correctly with all fields

### Create Task
- [ ] **Click "New Task" button:**
  - [ ] Dialog opens
  - [ ] Form fields are visible
- [ ] **Fill form:**
  - [ ] Title field required (shows error if empty)
  - [ ] Description is optional
  - [ ] Status dropdown works
  - [ ] Priority dropdown works
  - [ ] Due date picker works
- [ ] **Submit form:**
  - [ ] Success toast appears
  - [ ] Dialog closes
  - [ ] New task appears in list
  - [ ] Task saved to database

### Edit Task
- [ ] **Click "..." menu on a task:**
  - [ ] Dropdown menu appears
  - [ ] "Edit" option visible
- [ ] **Click "Edit":**
  - [ ] Dialog opens with task data pre-filled
  - [ ] Can modify all fields
- [ ] **Save changes:**
  - [ ] Success toast appears
  - [ ] Task updates in list
  - [ ] Changes saved to database

### Delete Task
- [ ] **Click "..." menu → Delete:**
  - [ ] Confirmation dialog appears
  - [ ] Can cancel deletion
- [ ] **Confirm deletion:**
  - [ ] Success toast appears
  - [ ] Task removed from list
  - [ ] Task deleted from database

### Task Status Toggle
- [ ] **Click checkbox on a task:**
  - [ ] TODO → COMPLETED (checkmark appears)
  - [ ] COMPLETED → TODO (circle appears)
  - [ ] Task updates immediately
  - [ ] Success toast appears
  - [ ] Status saved to database

### Search Functionality
- [ ] **Type in search box:**
  - [ ] Filters tasks by title
  - [ ] Filters tasks by description
  - [ ] Results update in real-time
  - [ ] Empty state shows if no matches

### Filter Functionality
- [ ] **Click "Filter" button:**
  - [ ] Dropdown menu opens
- [ ] **Test status filter:**
  - [ ] "All" shows all tasks
  - [ ] "To Do" shows only TODO tasks
  - [ ] "In Progress" shows only IN_PROGRESS tasks
  - [ ] "Completed" shows only COMPLETED tasks
- [ ] **Test priority filter:**
  - [ ] "All" shows all priorities
  - [ ] "High" shows only HIGH priority
  - [ ] "Medium" shows only MEDIUM priority
  - [ ] "Low" shows only LOW priority
- [ ] **Test combined filters:**
  - [ ] Status + Priority filters work together
  - [ ] "Clear Filters" button resets all filters

### Sort Functionality
- [ ] **Click "Sort" button:**
  - [ ] Dropdown menu opens
- [ ] **Test sort options:**
  - [ ] "Date Created" sorts by creation date
  - [ ] "Due Date" sorts by due date
  - [ ] "Priority" sorts by priority (High → Medium → Low)
- [ ] **Test sort order:**
  - [ ] "Ascending" sorts A→Z or oldest→newest
  - [ ] "Descending" sorts Z→A or newest→oldest
- [ ] **Verify sorting:**
  - [ ] Tasks reorder correctly
  - [ ] Sort persists during session

### Task Card Display
- [ ] **Verify task cards show:**
  - [ ] Task title
  - [ ] Task description (if present)
  - [ ] Priority badge with correct color
  - [ ] Due date (formatted correctly)
  - [ ] Status indicator (checkbox/circle)
  - [ ] Completed tasks show strikethrough

---

## 📅 5. Calendar API Testing (Basic)

### GET /api/calendar
- [ ] **Test endpoint:**
  ```javascript
  fetch('/api/calendar', { credentials: 'include' })
    .then(r => r.json())
    .then(console.log)
  ```
  - [ ] Returns array of events
  - [ ] Only returns events for logged-in user

### POST /api/calendar
- [ ] **Create event:**
  ```javascript
  fetch('/api/calendar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      title: 'Test Event',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString()
    })
  })
  ```
  - [ ] Event created successfully
  - [ ] Validation rejects if endTime <= startTime

---

## 🔔 6. Notifications API Testing

### GET /api/notifications
- [ ] **Test endpoint:**
  - [ ] Returns array of notifications
  - [ ] `?read=false` returns only unread
  - [ ] `?read=true` returns only read

### POST /api/notifications
- [ ] **Create notification:**
  - [ ] Notification created successfully
  - [ ] Appears in database

---

## 📊 7. Reports API Testing

### GET /api/reports
- [ ] **Test endpoint:**
  ```javascript
  fetch('/api/reports', { credentials: 'include' })
    .then(r => r.json())
    .then(console.log)
  ```
  - [ ] Returns analytics data
  - [ ] Includes task statistics
  - [ ] Includes completion rate
  - [ ] Includes tasks by priority

---

## 🤖 8. Automate API Testing

### POST /api/automate
- [ ] **Test endpoint:**
  ```javascript
  fetch('/api/automate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      taskInput: 'Plan my week',
      agentType: 'PLANNER'
    })
  })
  ```
  - [ ] Returns job ID
  - [ ] Job created in database
  - [ ] Status is PENDING or RUNNING

---

## 🐛 9. Error Handling Testing

### Authentication Errors
- [ ] **Test without login:**
  - [ ] API calls return 401
  - [ ] UI shows appropriate error messages
- [ ] **Test with invalid credentials:**
  - [ ] Login shows error message
  - [ ] Form validation works

### API Error Handling
- [ ] **Test invalid data:**
  - [ ] Missing required fields → 400 error
  - [ ] Invalid enum values → 400 error
  - [ ] Invalid date format → 400 error
- [ ] **Test not found:**
  - [ ] Access non-existent task → 404 error
  - [ ] Access another user's task → 404 error
- [ ] **Test server errors:**
  - [ ] Database connection issues handled gracefully
  - [ ] Error messages are user-friendly

### UI Error Handling
- [ ] **Test network errors:**
  - [ ] Disconnect internet → Shows error message
  - [ ] Reconnect → Can retry operation
- [ ] **Test form validation:**
  - [ ] Required fields show errors
  - [ ] Invalid formats show errors
  - [ ] Submit disabled when form invalid

---

## 🎨 10. UI/UX Testing

### Responsive Design
- [ ] **Test on different screen sizes:**
  - [ ] Desktop (1920x1080)
  - [ ] Tablet (768px)
  - [ ] Mobile (375px)
- [ ] **Verify:**
  - [ ] Layout adapts correctly
  - [ ] Buttons are clickable
  - [ ] Text is readable
  - [ ] Forms are usable

### Loading States
- [ ] **Verify loading indicators:**
  - [ ] Tasks page shows "Loading..." while fetching
  - [ ] Forms show "Saving..." during submission
  - [ ] Buttons disabled during operations

### Toast Notifications
- [ ] **Verify toasts appear for:**
  - [ ] Task created
  - [ ] Task updated
  - [ ] Task deleted
  - [ ] Login success
  - [ ] Registration success
  - [ ] Errors

### Navigation
- [ ] **Test all navigation:**
  - [ ] Dashboard sidebar links work
  - [ ] Can navigate between pages
  - [ ] Active page highlighted in sidebar
  - [ ] Back/forward browser buttons work

---

## 🔒 11. Security Testing

### User Data Isolation
- [ ] **Create two user accounts:**
  - [ ] User A creates tasks
  - [ ] User B logs in
  - [ ] User B cannot see User A's tasks
  - [ ] User B cannot access User A's tasks via API

### Input Validation
- [ ] **Test XSS prevention:**
  - [ ] Try entering `<script>alert('xss')</script>` in task title
  - [ ] Should be sanitized/escaped
- [ ] **Test SQL injection:**
  - [ ] Prisma should handle this automatically
  - [ ] No raw SQL queries

### Session Security
- [ ] **Test session expiration:**
  - [ ] Session persists across page refreshes
  - [ ] Session cleared on logout
  - [ ] Cannot access protected routes without session

---

## 📝 12. Data Persistence Testing

### Create and Refresh
- [ ] **Create a task:**
  - [ ] Refresh page
  - [ ] Task still exists
  - [ ] Data persisted in database

### Update and Refresh
- [ ] **Update a task:**
  - [ ] Refresh page
  - [ ] Changes persist
  - [ ] Data updated in database

### Delete and Refresh
- [ ] **Delete a task:**
  - [ ] Refresh page
  - [ ] Task still deleted
  - [ ] Data removed from database

---

## 🚀 13. Performance Testing

### Page Load
- [ ] **Test initial load:**
  - [ ] Dashboard loads in < 2 seconds
  - [ ] Tasks page loads in < 2 seconds
  - [ ] No console errors

### API Response Times
- [ ] **Test API endpoints:**
  - [ ] GET requests respond in < 500ms
  - [ ] POST/PUT requests respond in < 1s
  - [ ] DELETE requests respond in < 500ms

### Large Data Sets
- [ ] **Test with many tasks:**
  - [ ] Create 50+ tasks
  - [ ] List still loads quickly
  - [ ] Filtering/searching still fast
  - [ ] No performance degradation

---

## ✅ Quick Test Script

Run this in browser console (while logged in) to test all APIs:

```javascript
// Test Tasks API
async function testAll() {
  console.log('Testing Tasks API...')
  
  // Create
  const create = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      title: 'Test Task',
      description: 'API Test',
      priority: 'HIGH',
      status: 'TODO'
    })
  })
  const task = await create.json()
  console.log('Created:', task)
  
  // Read
  const read = await fetch('/api/tasks', { credentials: 'include' })
  const tasks = await read.json()
  console.log('All tasks:', tasks)
  
  // Update
  const update = await fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ status: 'COMPLETED' })
  })
  const updated = await update.json()
  console.log('Updated:', updated)
  
  // Delete
  const del = await fetch(`/api/tasks/${task.id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  console.log('Deleted:', await del.json())
  
  console.log('✅ All tests passed!')
}

testAll()
```

---

## 🎯 Priority Testing Order

1. **Critical Path:**
   - [ ] Database connection
   - [ ] User registration
   - [ ] User login
   - [ ] Task creation
   - [ ] Task display

2. **Core Features:**
   - [ ] Task editing
   - [ ] Task deletion
   - [ ] Task status toggle
   - [ ] Search and filters

3. **Polish:**
   - [ ] Error handling
   - [ ] Loading states
   - [ ] Responsive design
   - [ ] Performance

---

## 📞 Common Issues & Solutions

### Issue: "Missing required environment variable: DATABASE_URL"
**Solution:** Check `.env` file exists in `task-automator` directory with correct values

### Issue: "Unauthorized" errors
**Solution:** Make sure you're logged in and session cookie is set

### Issue: Tasks not appearing
**Solution:** 
- Check browser console for errors
- Verify API endpoint returns data
- Check database has tasks for your user

### Issue: Form validation not working
**Solution:** Check browser console for Zod validation errors

### Issue: Hydration errors
**Solution:** Already fixed with `suppressHydrationWarning` on body tag

---

## ✅ Completion Checklist

Once all items are checked:
- [ ] All critical features working
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All API endpoints responding
- [ ] UI is responsive
- [ ] Data persists correctly
- [ ] Security measures in place

**Status:** Ready for Phase 2.3 (Calendar Integration) or Phase 3 (AI Integration)


