# 💰 Org Finance Manager API

A backend system for managing organizational financial records with role-based access, filtering, search, and dashboard insights.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Analyst)
- Secure APIs with middleware protection

### 👥 User Management
- Admin can:
  - Change user roles
  - Activate/Deactivate users
- Safety checks:
  - Prevent self role/status change
  - Prevent removing last admin

### 📊 Records Management
- Create, update, delete (soft delete)
- Fetch all records with pagination
- Records include:
  - type (income/expense)
  - category
  - amount
  - date

### 🔍 Filtering API
- Filter by:
  - category
  - type
  - date (single day)
- Supports combined filters

### 🔎 Search API
- Search across:
  - type
  - category
  - description
  - amount (numeric search)

### 📈 Dashboard APIs
- Total income
- Total expenses
- Net balance
- Category-wise totals
- Monthly aggregated data

### 📝 Activity Logging
- Tracks:
  - Role changes
  - Status changes
  - Record actions
- Stores:
  - action
  - entityType
  - doneBy
  - message

---

## 🔐 Demo Credentials
> ⚠️ These are demo credentials for testing purposes only.

Use the following test accounts to explore role-based features:

### 👑 Admin
- Email: admin1@gmail.com  
- Password: Admin@1  

### 👤 User
- Email: user1@gmail.com  
- Password: User@1  

### 📊 Analyst
- Email: analyst1@gmail.com  
- Password: Analyst@1  

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 📂 Folder Structure
