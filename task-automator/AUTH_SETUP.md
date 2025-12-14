# Authentication Setup Guide

## ✅ What's Been Set Up

Authentication is now fully implemented using NextAuth.js v5 (Auth.js) with the following features:

### Features
- ✅ Email/Password authentication
- ✅ User registration with password hashing (bcrypt)
- ✅ Protected routes (dashboard and API routes)
- ✅ Session management (JWT)
- ✅ User profile menu with logout
- ✅ Form validation (Zod + React Hook Form)
- ✅ Toast notifications for user feedback

## 📋 Required Environment Variables

Add these to your `.env` file in the `task-automator` directory:

```env
# Database (already set up)
DATABASE_URL="..."
DIRECT_URL="..."

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### Generating NEXTAUTH_SECRET

**On Windows (PowerShell):**
```powershell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
```

**On Mac/Linux:**
```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## 🚀 How to Use

### 1. Start the Development Server

```bash
cd task-automator
npm run dev
```

### 2. Create an Account

1. Navigate to `http://localhost:3000/signup`
2. Fill in your details:
   - Full name
   - Email
   - Password (minimum 8 characters)
   - Confirm password
3. Click "Create account"
4. You'll be redirected to the login page

### 3. Sign In

1. Navigate to `http://localhost:3000/login`
2. Enter your email and password
3. Click "Sign in"
4. You'll be redirected to the dashboard

### 4. Access Protected Routes

- All `/dashboard/*` routes are protected
- Unauthenticated users are redirected to `/login`
- API routes under `/api/tasks`, `/api/calendar`, etc. are protected

### 5. Sign Out

- Click your avatar in the top-right corner of the dashboard
- Click "Log out"
- You'll be redirected to the login page

## 📁 File Structure

```
task-automator/
├── lib/
│   └── auth.ts                    # NextAuth configuration
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.ts      # NextAuth API route
│   │       └── register/
│   │           └── route.ts       # Registration API
│   ├── login/
│   │   └── page.tsx               # Login page (updated)
│   └── signup/
│       └── page.tsx               # Signup page (updated)
├── components/
│   ├── providers.tsx              # SessionProvider wrapper
│   └── dashboard-header.tsx       # User menu (updated)
├── middleware.ts                   # Route protection
└── types/
    └── next-auth.d.ts            # TypeScript types
```

## 🔧 How It Works

### Authentication Flow

1. **Registration:**
   - User submits signup form
   - Password is hashed with bcrypt
   - User is created in database
   - User is redirected to login

2. **Login:**
   - User submits login form
   - Credentials are validated against database
   - Session is created (JWT token)
   - User is redirected to dashboard

3. **Session Management:**
   - JWT token stored in HTTP-only cookie
   - Session data available via `useSession()` hook
   - Protected routes check for valid session

4. **Route Protection:**
   - Middleware intercepts requests to protected routes
   - Checks for valid session token
   - Redirects to login if not authenticated

### Database Schema

The authentication uses these Prisma models:
- `User` - User accounts
- `Account` - OAuth accounts (for future OAuth support)
- `Session` - Active sessions
- `VerificationToken` - Email verification tokens

## 🔐 Security Features

- ✅ Passwords are hashed with bcrypt (10 rounds)
- ✅ JWT tokens for stateless sessions
- ✅ HTTP-only cookies (prevents XSS)
- ✅ Protected API routes
- ✅ Form validation on client and server
- ✅ SQL injection protection (Prisma)

## 🎯 Next Steps

1. **Add Email Verification** (optional)
   - Send verification emails
   - Verify email before allowing login

2. **Add OAuth Providers** (optional)
   - Google OAuth
   - GitHub OAuth
   - Add to `lib/auth.ts` providers array

3. **Add Password Reset** (optional)
   - Forgot password flow
   - Email with reset link
   - Update password functionality

4. **Add Two-Factor Authentication** (optional)
   - TOTP support
   - SMS verification

## 🐛 Troubleshooting

### "NEXTAUTH_SECRET is missing"
- Add `NEXTAUTH_SECRET` to your `.env` file
- Restart the development server

### "Invalid credentials"
- Check that the user exists in the database
- Verify password is correct
- Check database connection

### "Redirect loop"
- Ensure `NEXTAUTH_URL` matches your app URL
- Check middleware configuration

### Session not persisting
- Clear browser cookies
- Check that cookies are enabled
- Verify `NEXTAUTH_SECRET` is set

## 📚 Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)



