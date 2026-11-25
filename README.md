# Student Attendance Management System (SAMS)

A full-stack college attendance and student-management project with separate Admin, Teacher and Student experiences.

## Live deployment

- Frontend: https://sams-web-production.up.railway.app
- Backend API: https://sams-api-production.up.railway.app
- API health: https://sams-api-production.up.railway.app/api/health
- Railway project: https://railway.com/project/0488e9cc-81c3-4e92-81fd-25de5c114c4c

Both Railway services have successful deployments. The frontend uses the Railway API URL via `VITE_API_URL`; the backend connects to MongoDB Atlas.

## Stack

- React + Vite
- Node.js + Express REST API
- MongoDB Atlas + Mongoose
- JWT authentication + bcrypt password hashing
- Recharts analytics and PDFKit reports

## Features

- Role-based login for admin, teacher and student
- Admin/teacher student directory and student creation
- Teachers can mark and review daily attendance
- Students can view their own attendance history and percentage
- Dashboard analytics and downloadable attendance PDF
- Protected API routes and environment-based secrets

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

The seed script creates these demo accounts when run against your configured MongoDB database:

- Admin: `admin@sams.local` / `Admin@12345`
- Teacher: `teacher@sams.local` / `Teacher@12345`
- Student: `student@sams.local` / `Student@12345`

**Production database note:** the demo seed script has not been run against the hosted database. To create these accounts in the hosted database, clone this repository, put the hosted MongoDB connection string in `server/.env`, then run `npm run seed` from the repository root. Change the demo passwords before real use.

## Deploy

Railway services are configured as follows:

- API root: `/server`; start command: `npm start`; health check: `/api/health`
- Web root: `/client`; build command: `npm run build`; start command: `npm run preview -- --host 0.0.0.0 --port $PORT`
- Frontend variable: `VITE_API_URL=https://sams-api-production.up.railway.app/api`
- Backend variables: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_ENV`

Never commit real credentials or a populated `.env` file. Restrict MongoDB Atlas Network Access to known egress IPs if/when available; the current Railway deployment uses broad network access because the service's outbound IP is dynamic.
