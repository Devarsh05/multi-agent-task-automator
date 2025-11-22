# Database Setup - Quick Start

## What's Been Set Up ✅

1. **Prisma Client** (`lib/db.ts`) - Database connection utility ready to use
2. **Prisma Schema** (`prisma/schema.prisma`) - All tables defined:
   - Users, Accounts, Sessions (authentication)
   - Tasks, Calendar Events
   - Agent Jobs, Notifications
   - Analytics

## Next Steps (Follow SUPABASE_SETUP.md)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project

2. **Get Connection Strings**
   - Settings → Database → Connection string
   - Copy `DATABASE_URL` (connection pooling) and `DIRECT_URL` (direct connection)

3. **Add to .env file** (in `task-automator` directory):
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@..."
   DIRECT_URL="postgresql://postgres:[PASSWORD]@..."
   ```

4. **Generate and Push Schema**:
   ```bash
   cd task-automator
   npx prisma generate
   npx prisma db push
   ```

5. **Verify**:
   - Check Supabase Dashboard → Table Editor
   - Or run `npx prisma studio` to browse your database

## Using the Database in Your Code

```typescript
import { db } from "@/lib/db"

// Example: Get all tasks
const tasks = await db.task.findMany()

// Example: Create a task
const task = await db.task.create({
  data: {
    title: "My Task",
    status: "TODO",
    priority: "HIGH",
    userId: "user-id"
  }
})
```

📘 **Full Guide**: See `SUPABASE_SETUP.md` for detailed instructions and troubleshooting.

