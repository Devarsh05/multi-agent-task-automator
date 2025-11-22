# Supabase Database Setup Guide

This guide will help you set up Supabase as your database for the Multi-Agent Task Automator project.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click **"New Project"**
4. Fill in the project details:
   - **Name**: `multi-agent-task-automator` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the region closest to you
5. Click **"Create new project"**
6. Wait for the project to be set up (takes 1-2 minutes)

## Step 2: Get Your Database Connection Strings

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. You'll see two connection strings:
   - **URI**: This is your `DATABASE_URL` (with connection pooling)
   - **Direct connection**: This is your `DIRECT_URL` (for migrations)

4. Copy both connection strings:
   - Look for **Connection pooling** section - use the **Session mode** URI for `DATABASE_URL`
   - Look for **Connection string** section - use the **Direct connection** for `DIRECT_URL`

   The format will look like:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"
   ```

   **Important**: Replace `[YOUR-PASSWORD]` with the database password you set when creating the project.

## Step 3: Configure Environment Variables

1. Open or create `.env` file in the `task-automator` directory
2. Add your Supabase connection strings:

```env
# Supabase Database Connection
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

**Important Notes:**
- Replace `[YOUR-PASSWORD]` with your actual database password
- Replace `[region]` with your actual region (e.g., `us-east-1`, `eu-west-1`)
- The `DATABASE_URL` uses port `6543` (pgBouncer connection pooler)
- The `DIRECT_URL` uses port `5432` (direct PostgreSQL connection for migrations)
- URL-encode your password if it contains special characters (e.g., `@` becomes `%40`)

## Step 4: Generate Prisma Client

Run this command to generate the Prisma Client based on your schema:

```bash
cd task-automator
npx prisma generate
```

## Step 5: Push Schema to Supabase

Push your Prisma schema to your Supabase database:

```bash
npx prisma db push
```

This will:
- Create all the tables defined in your schema
- Set up relationships and indexes
- Create enums

**Note**: If you want to use migrations instead (recommended for production):

```bash
npx prisma migrate dev --name init
```

## Step 6: Verify the Setup

1. Open Supabase Dashboard → **Table Editor**
2. You should see all your tables:
   - `users`
   - `accounts`
   - `sessions`
   - `verification_tokens`
   - `tasks`
   - `calendar_events`
   - `agent_jobs`
   - `notifications`
   - `analytics`

3. Or verify using Prisma Studio:
   ```bash
   npx prisma studio
   ```
   This will open a visual database browser at `http://localhost:5555`

## Step 7: Set Up Row Level Security (Optional but Recommended)

Supabase uses Row Level Security (RLS) to secure your data. You'll want to set up RLS policies later when implementing authentication. For now, you can leave it disabled during development.

To enable RLS later:
1. Go to **Authentication** → **Policies** in Supabase Dashboard
2. Create policies for each table based on your security requirements

## Troubleshooting

### Error: "Environment variable not found"
- Make sure your `.env` file is in the `task-automator` directory (same level as `package.json`)
- Restart your terminal/IDE after creating/updating `.env`

### Error: "Connection refused" or "Can't reach database"
- Verify your connection strings are correct
- Make sure you're using the correct password (URL-encoded if necessary)
- Check that your IP is allowed in Supabase (Settings → Database → Connection pooling)

### Error: "SSL connection required"
- Supabase requires SSL. Make sure your connection string includes `?sslmode=require` or similar SSL parameters
- The connection strings from Supabase dashboard should already include SSL settings

### URL Encoding Your Password
If your password contains special characters:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`
- `?` → `%3F`

Or use an online URL encoder to encode your entire password.

## Next Steps

Once your database is set up:
1. ✅ Database Setup Complete
2. ⏭️ Move to **1.2 Authentication Implementation** in `NEXT_STEPS.md`
3. ⏭️ Create API routes to interact with the database

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma with Supabase](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-supabase)
- [Connection Pooling in Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)

