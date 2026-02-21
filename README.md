Student Management System API

The Student Management System API is a role-based backend service for managing students and their assigned tasks. It is built using Express, TypeScript, MongoDB Atlas, and JWT authentication, with Zod-based request validation and centralized error handling.

Tech Stack

Node.js

Express v5

TypeScript

MongoDB Atlas (Mongoose)

JWT Authentication

Zod Validation

tsx (Development Runtime)

Architecture Overview

The project follows a layered architecture:

routes → middleware → controllers → services → models

Routes: Define endpoints and apply middleware.

Middleware: Handles authentication (JWT), role-based access control (RBAC), validation, and error handling.

Controllers: Manage HTTP request/response flow.

Services: Contain business logic.

Models: Define MongoDB schemas using Mongoose.

The system includes:

Centralized error handling middleware

Role-based route protection

Zod-based request validation

Dynamic overdue calculation logic

Features
Admin

Register Admin

Login

Create Student (Admin only)

Assign Task to Student (Admin only)

Student

Login

View assigned tasks

View task status (pending / overdue / completed)

Mark task as completed

API Base URL

Local:

http://localhost:4000

Production:

[Your Deployed URL Here]
Authentication

All protected routes require:

Authorization: Bearer <JWT_TOKEN>
Environment Variables

Create a .env file:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
API Endpoints
Authentication
Register Admin

POST /api/auth/register-admin

Request:

{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123"
}

Response:

{
  "success": true,
  "data": {
    "_id": "64f...",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "admin"
  }
}
Login

POST /api/auth/login

Request:

{
  "email": "admin@example.com",
  "password": "password123"
}

Response:

{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Admin Endpoints (Admin Role Required)
Create Student

POST /api/students

Request:

{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "password123",
  "department": "Computer Science"
}
Assign Task

POST /api/tasks

Request:

{
  "title": "Build REST API",
  "description": "Complete assignment",
  "dueDate": "2026-02-25",
  "studentId": "64f..."
}

Response:

{
  "success": true,
  "data": {
    "_id": "65a...",
    "title": "Build REST API",
    "status": "pending"
  }
}
Student Endpoints (Student Role Required)
Get My Tasks

GET /api/tasks/my

Response:

{
  "success": true,
  "data": [
    {
      "_id": "65a...",
      "title": "Build REST API",
      "dueDate": "2026-02-25T00:00:00.000Z",
      "status": "pending"
    }
  ]
}
Dynamic Overdue Logic

If:

status !== completed

dueDate < current date

Then API automatically returns:

"status": "overdue"

(Overdue is not stored in the database — it is computed dynamically.)

Update Task Status

PATCH /api/tasks/:taskId

Request:

{
  "status": "completed"
}

Response:

{
  "success": true,
  "data": {
    "_id": "65a...",
    "status": "completed"
  }
}
Validation & Error Handling

The API uses Zod for request validation.

Invalid input example:

{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "body.email",
      "message": "Invalid email format"
    }
  ]
}

All runtime errors are handled by centralized error middleware for consistent JSON responses.

Setup Instructions

Clone the repository

git clone <repository-url>
cd student-management-api

Install dependencies

npm install

Configure .env

Run development server

npm run dev