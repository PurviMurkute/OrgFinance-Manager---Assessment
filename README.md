# 🚀 Org Finance Manager API

A robust backend system to manage organizational financial records with **role-based access control (RBAC)**. Built using **Node.js, Express, and MongoDB**, this API supports secure authentication, record management, analytics, and activity tracking.

---

## 🌐 Live API

```
https://org-finance-manager-api-backend.onrender.com
```

---

## 🔐 Demo Credentials

### 👑 Admin

* Email: `admin1@gmail.com`
* Password: `Admin@1`

### 👤 User

* Email: `user1@gmail.com`
* Password: `User@1`

### 📊 Analyst

* Email: `analyst1@gmail.com`
* Password: `Analyst@1`

---

## 🧠 Features

* 🔐 JWT-based Authentication
* 👥 Role-based Access Control (Admin, User, Analyst)
* 💰 Financial Record Management (CRUD)
* 🔍 Search & Filtering
* 📊 Dashboard Analytics (date-wise insights)
* 🗑️ Soft Delete & Restore
* 📜 Activity Logging
* ⏱️ Cron Job Integration

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Swagger (API Documentation)

---

## 📡 API Endpoints

---

### 🔐 AUTH ROUTES

#### Register User (Default Role: User)

```
POST /api/v1/auth/register
```

#### Login

```
POST /api/v1/auth/login
```

---

### 👤 USER ROUTES (Admin Only)

#### Get All Users

```
GET /api/v1/users
```

#### Update User Role

```
PATCH /api/v1/users/:id/role
```

#### Update User Status (Active/Inactive)

```
PATCH /api/v1/users/:id/status
```

---

### 💰 RECORD ROUTES

#### Get All Records (Admin, Analyst)

```
GET /api/v1/records
```

#### Get Records with Pagination

```
GET /api/v1/records?page=1&limit=3
```

#### Create Record (Admin)

```
POST /api/v1/records
```

#### Update Record (Admin)

```
PUT /api/v1/records/:id
```

#### Soft Delete Record (Admin)

```
PATCH /api/v1/records/:id/soft-delete
```

#### Get Deleted Records (Admin)

```
GET /api/v1/records/trash
```

#### Restore Record (Admin)

```
PATCH /api/v1/records/:id/restore
```

---

### 🔍 SEARCH & FILTER

#### Search Records

```
GET /api/v1/records/search?query=shopping
```

#### Filter Records

```
GET /api/v1/records/filter?category=rent&type=expense&date=2024-04-05
```

---

### 📊 DASHBOARD ROUTES

#### Get Dashboard Summary

```
GET /api/v1/dashboard/summary
```

#### Get Summary by Date Range

```
GET /api/v1/dashboard/summary?startdate=2026-04-01&enddate=2026-04-30
```

---

### ❤️ HEALTH CHECK

```
GET /health
```

---

## 🔑 Authentication

Protected routes require a JWT token:

```
Authorization: Bearer <your_token>
```

> ⚠️ Note: Auth routes (register/login) do not require a token.

---

## 📄 API Documentation

Swagger Docs:

```
https://org-finance-manager-api-backend.onrender.com/api-docs

```

---

## 🚀 Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-link>
cd server
```

### 2. Install Dependencies

```
npm install
```

### 3. Add Environment Variables

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

### 4. Run Server

```
npm run dev
```

---

## 🔒 Security & Best Practices

* Role cannot be assigned during registration
* Prevented self-role modification
* Prevented last admin role/status change
* Soft delete used instead of permanent deletion
* Input validation and error handling implemented

---

## 👩‍💻 Author

**Purvi Murkute**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
