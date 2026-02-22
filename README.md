# Student Management System API

A role-based backend API for managing students and their assigned tasks.

Built using **Express.js (v5)**, **TypeScript**, **MongoDB Atlas**, **JWT authentication**, and **Zod validation**.  
The system implements role-based access control (RBAC), centralized error handling, and structured request validation.

---

## Production URL

**Live API:**  
https://student-management-api-nn3u.onrender.com

---

## Tech Stack

- Node.js  
- Express v5  
- TypeScript  
- MongoDB Atlas (Mongoose)  
- JWT Authentication  
- Zod Request Validation  
- Centralized Error Middleware  
- Render (Deployment)

---

## Architecture Overview

The project follows a clean layered architecture:

```
routes → middleware → controllers → services → models
```

### Layer Responsibilities

- **Routes**  
  Define API endpoints and attach middleware.

- **Middleware**
  - JWT authentication
  - Role-based access control (RBAC)
  - Zod request validation
  - Global error handling

- **Controllers**  
  Handle HTTP request/response flow.

- **Services**  
  Contain business logic and data processing.

- **Models**  
  Define MongoDB schemas using Mongoose.

---

## Authentication

JWT-based authentication is used.

After login, include the token in protected routes:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Features

## Admin Capabilities

- Register Admin
- Login
- Create Students
- Assign Tasks to Students

## Student Capabilities

- Login
- View assigned tasks
- See task status:
  - `pending`
  - `overdue` (calculated dynamically)
  - `completed`
- Mark task as completed

---

# API Endpoints

---

## 🔑 Authentication

### Register Admin

**POST** `/api/auth/register-admin`

#### Request

```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "_id": "64f...",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

### Login

**POST** `/api/auth/login`

#### Request

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Admin Routes (Admin Role Required)

All routes require:

```
Authorization: Bearer <ADMIN_TOKEN>
```

---

### Create Student

**POST** `/api/students`

```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "password123",
  "department": "Computer Science"
}
```

---

### Assign Task

**POST** `/api/tasks`

```json
{
  "title": "Build REST API",
  "description": "Complete assignment",
  "dueDate": "2026-02-25",
  "studentId": "64f..."
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "_id": "65a...",
    "title": "Build REST API",
    "status": "pending"
  }
}
```

---

## Student Routes (Student Role Required)

All routes require:

```
Authorization: Bearer <STUDENT_TOKEN>
```

---

### Get My Tasks

**GET** `/api/tasks/my`

```json
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
```

---

### Dynamic Overdue Logic

If:

- Task is not completed  
- Current date exceeds `dueDate`

The API automatically returns:

```json
"status": "overdue"
```

> Overdue is not stored in the database.  
> It is calculated dynamically during response generation.

---

### Update Task Status

**PATCH** `/api/tasks/:taskId`

```json
{
  "status": "completed"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "_id": "65a...",
    "status": "completed"
  }
}
```

---

# Validation & Error Handling

The API uses **Zod** for request validation.

Example validation error:

```json
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
```

All runtime errors are handled through a centralized global error middleware to ensure consistent JSON responses.

---

# ⚙️ Environment Variables

Create a `.env` file:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# 💻 Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Razirasheed03/student-management-api
cd student-management-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file and add required variables.

### 4️⃣ Run Development Server

```bash
npm run dev
```

### 5️⃣ Build for Production

```bash
npm run build
npm start
```

---

# ☁ Deployment

Deployed on **Render**.

**Build Command**

```bash
npm install && npm run build
```

**Start Command**

```bash
npm start
```

Environment variables are configured in the Render dashboard.

---

# 📂 Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── types/
 ├── app.ts
 └── server.ts
```

---

# Design Decisions

- Unified User model using role field (`admin` / `student`)
- Dynamic overdue calculation instead of storing redundant state
- Zod validation before controller execution
- Role-based middleware protection
- Centralized error handling

---

# Submission Summary

This project demonstrates:

- Secure JWT authentication  
- Role-based authorization  
- Input validation with Zod  
- MongoDB Atlas integration  
- Clean layered architecture  
- Production deployment  

The API is fully functional and deployed in production.