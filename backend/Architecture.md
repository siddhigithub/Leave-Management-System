## 🏗️ Architecture Overview

This project follows a **3-tier architecture**:

### 1. Frontend (React.js)

* Handles UI and user interactions
* Communicates with backend via REST APIs
* Implements role-based UI (Admin, Manager, Employee)

### 2. Backend (Node.js + Express)

* Handles business logic and API requests
* Implements authentication using JWT
* Performs validation and authorization
* Structured into:

  * Controllers (business logic)
  * Routes (API endpoints)
  * Middleware (auth & roles)
  * Models (database queries)
  * Utils (helper functions)

### 3. Database (MySQL / PlanetScale)

* Stores application data including:

  * Users
  * Leave requests
  * Leave balances
  * Holidays
  * Audit logs

---

## 🔄 Application Flow

1. User interacts with the frontend (React UI)
2. Frontend sends API request to backend
3. Backend validates request and processes logic
4. Backend interacts with database
5. Response is sent back to frontend

---

## 👥 Role-Based Access

* **Admin** → Full access
* **Manager** → Approve/Reject leave requests
* **Employee** → Apply leave and view personal data

---

## 🔐 Security

* JWT-based authentication
* Password hashing using bcrypt
* Role-based authorization

---

## 📌 Key Features

* Leave application with working-day calculation
* Manager approval system
* Leave balance tracking
* Team calendar view
* Audit logging for approvals
