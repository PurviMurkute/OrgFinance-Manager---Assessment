# 🚀 Org Finance Manager API

A backend system to manage organizational financial records with role-based access control. Built using **Node.js, Express, MongoDB**, and includes authentication, filtering, search, and dashboard analytics.

---

## 🌐 Live API

Base URL:

```
https://expensetracker-server-ykfd.onrender.com
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

* Role-based access (Admin, User, Analyst)
* JWT Authentication
* Financial record management
* Search & filtering
* Dashboard analytics
* Activity logging
* Soft delete & restore
* Cron job support

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Swagger (API Docs)

---

## 📡 API Endpoints

---

### 🔐 AUTH ROUTES

#### Register User/Admin/Analyst

```
POST /api/v1/auth/register
```

#### Login User/Admin/Analyst

```
POST /api/v1/auth/login
```

---

### 👤 USER ROUTES

#### Get All Users (Admin)

```
GET /api/v1/users
```

#### Update User Role (Admin)

```
PATCH /api/v1/users/:id/role
```

#### Update User Status (Admin)

```
PATCH /api/v1/users/:id/status
```

---

### 💰 RECORD ROUTES

#### Get All Records (Admin/Analyst)

```
GET /api/v1/records
```

#### Get Records with Pagination (Admin/Analyst)

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

#### Delete Record (Soft Delete) (Admin)

```
PATCH /api/v1/records/:id/soft-delete
```

#### Get Soft Deleted Records (Admin)

```
GET /api/v1/records/trash
```

#### Restore Record (Admin)

```
PATCH /api/v1/records/:id/restore
```

---

### 🔍 SEARCH & FILTER

#### Search Records (Admin/Analyst)

```
GET /api/v1/records/search?query=shopping
```

#### Filter Records (Admin/Analyst)

```
GET /api/v1/records/filter?category=rent&type=expense&date=2024-04-5
```

---

### 📊 DASHBOARD ROUTES

#### Get Dashboard Summary

```
GET /api/v1/dashboard/summary
```

#### Get Monthly Summary

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

All the routes require a JWT token.

Add token in header:

```
Authorization: Bearer <your_token>
```

---

## 📄 API Documentation

Swagger Docs:

```
http://localhost:5000/api-docs
```

(After deployment)

```
https://your-app.onrender.com/api-docs
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

## 📌 Notes

* Only Admin can create/update/delete records
* Users can view records
* Analyst can view analytics
* Prevent self-role and last-admin changes (handled in backend)

---

## 👩‍💻 Author

**Purvi Murkute**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
