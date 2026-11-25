# Student Attendance Management System (SAMS)

A full-stack college attendance and student-management project with separate Admin, Teacher and Student experiences.

## Stack
- React + Vite + Tailwind-ready CSS (custom responsive styling)
- Node.js + Express REST API
- MongoDB Atlas + Mongoose
- JWT authentication + bcrypt password hashing
- Recharts analytics, PDFKit reports, Nodemailer email notifications

## Features
- Role-based login for admin, teacher and student
- Admin/teacher student directory and student creation
- Teachers can mark and review daily attendance
- Students can view their own attendance history and percentage
- Dashboard analytics and downloadable attendance PDF
- Optional email notification when attendance is recorded
- Protected API routes, input validation and environment-based secrets

## Run locally on macOS
1. Install Node.js 20+ and create a MongoDB Atlas cluster.
2. In Atlas, create a database user, allow your IP in Network Access, and copy the Node.js connection string.
3. Copy `server/.env.example` to `server/.env` and fill in `MONGODB_URI`, `JWT_SECRET`, and optional SMTP values.
4. From the repository root run:
   ```bash
   npm install
   npm run install:all
   npm run seed
   npm run dev
   ```
5. Open http://localhost:5173

The API runs on http://localhost:5000. Health check: http://localhost:5000/api/health

## Demo accounts
Run `npm run seed` after setting the database connection. The seed script creates:
- Admin: `admin@sams.local` / `Admin@12345`
- Teacher: `teacher@sams.local` / `Teacher@12345`
- Student: `student@sams.local` / `Student@12345`

Change these demo passwords before using the system outside a local demonstration.

## Deploy
Deploy the `server` directory as a Node web service and set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, and optional SMTP environment variables. Set the service start command to `npm start`. Deploy the `client` directory as a static site with build command `npm run build`, publish directory `dist`, and `VITE_API_URL` pointing to the deployed API base URL (ending in `/api`).

Never commit real credentials or a populated `.env` file.
