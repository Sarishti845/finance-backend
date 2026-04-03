# 💰 Finance Backend System (RBAC + Analytics)

A robust backend system for managing financial transactions, user roles, and dashboard analytics.  
Built using **Node.js, Express, and MongoDB**, this project demonstrates clean architecture, role-based access control, and real-world backend practices.

---

## 🚀 Live API

- 🔗 **Base URL:** https://finance-backend-dga2.onrender.com
- ❤️ **Health Check:** https://finance-backend-dga2.onrender.com/health

---

## 🧠 Project Overview

This backend powers a finance dashboard where users interact with financial data based on their roles.

It focuses on:
- Clean API design
- Role-based authorization
- Scalable backend structure
- Real-world data handling and analytics

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes using middleware

### 👤 User & Role Management
- Roles:
  - **Admin**
  - **Analyst**
  - **Viewer**
- Admin capabilities:
  - Create users
  - Update roles
  - Toggle active/inactive status
- Role-based access enforced

### 💸 Financial Transactions
- Create, Read, Update, Delete transactions
- Fields:
  - Amount
  - Type (income / expense)
  - Category
  - Date
  - Notes
- Filtering:
  - By type
  - By category
  - By date range

### 📄 Pagination & Sorting
- Pagination:
  - `page`
  - `limit`
- Sorting:
  - `sortBy`
  - `order (asc / desc)`

### 📊 Dashboard Analytics
- Total income
- Total expenses
- Net balance
- Category-wise breakdown
- Monthly trends

---

## 🛡️ Role-Based Access Control

| Role     | Permissions |
|----------|------------|
| Viewer   | Read-only access |
| Analyst  | Read + analytics |
| Admin    | Full access (CRUD + user management) |

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt

---

## 📁 Project Structure

```bash
finance-backend/
│
├── config/              # Database connection
├── controllers/         # Business logic
├── middleware/          # Auth & RBAC
├── models/              # Schemas
├── routes/              # API routes
├── app.js               # Entry point
├── .env                 # Environment variables (not committed)
└── package.json
```

---

## 📡 API Endpoints

### 🔑 Authentication

| Method | Route | Access | Description |
|-------|------|--------|------------|
| POST | /api/auth/login | Public | Login user and return JWT |

---

### 👤 Users (Admin Only)

| Method | Route | Description |
|-------|------|------------|
| POST | /api/users | Create user |
| GET | /api/users | Get all users |
| PUT | /api/users/:id/role | Update user role |
| PUT | /api/users/:id/status | Toggle user status |

---

### 💸 Transactions

| Method | Route | Access | Description |
|-------|------|--------|------------|
| POST | /api/transactions | Admin | Create transaction |
| GET | /api/transactions | All roles | List transactions (filter + pagination) |
| PUT | /api/transactions/:id | Admin | Update transaction |
| DELETE | /api/transactions/:id | Admin | Delete transaction |

---

### 📊 Dashboard

| Method | Route | Access | Description |
|-------|------|--------|------------|
| GET | /api/transactions/stats | Analyst, Admin | Summary stats |
| GET | /api/transactions/trends | Analyst, Admin | Monthly trends |

---

## 🔑 Authorization

All protected routes require:

```bash
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Sarishti845/finance-backend.git
cd finance-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run Server
```bash
npm run dev
```

---

## 🧪 Testing

- Use Postman or Thunder Client
- Login → Get JWT → Add token in headers
- Test protected routes

---

## 🔍 Example Query

```bash
GET /api/transactions?type=income&category=salary&page=1&limit=5&sortBy=date&order=desc
```

---

## ⚠️ Assumptions & Design Decisions

- JWT used for authentication
- Middleware-based RBAC
- MongoDB for flexible schema
- Pagination implemented for scalability
- Clean architecture prioritized

---

## 🚀 Future Improvements

- Rate limiting for API protection
- Swagger API documentation
- Unit & integration testing
- CI/CD pipeline
- Caching for performance

---

## 👩‍💻 Author

**Sarishti**  
B.Tech CSE Student | Backend Developer

---

## ⭐ Highlights

- Clean modular structure
- Strong RBAC implementation
- Aggregation-based analytics
- Scalable backend design

---
