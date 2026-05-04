I want you to build a complete **Leave Management System** as a full-stack application using:

* Frontend: React.js
* Backend: Node.js + Express
* Database: Use a **cloud database (since I am using GitHub Codespaces)** such as MySQL-compatible remote DB (PlanetScale / Railway / similar). Do NOT assume localhost DB.

---

# 🎯 SYSTEM OVERVIEW

The system has 3 roles:

1. ADMIN

* Full access
* Can view all users and leave data
* Can manage leave types and holidays

2. MANAGER

* Can see leave requests of assigned employees
* Can approve or reject leave requests
* Can add optional comments
* Action should be logged with timestamp

3. EMPLOYEE

* Can apply for leave
* Can only see their own leave data
* Can view leave balance

---

# 🔐 AUTHENTICATION

* Use JWT-based authentication
* Store JWT_SECRET in .env
* Hash passwords using bcrypt
* Return token + user info on login

APIs:

* POST /api/auth/register (default role = EMPLOYEE)
* POST /api/auth/login

---

# 🗄️ DATABASE DESIGN

Create the following tables:

1. users

* id
* name
* email (unique)
* password (hashed)
* role (ADMIN, MANAGER, EMPLOYEE)
* manager_id (FK)

2. leave_types

* id
* name (Sick, Casual, WFH, Comp-off)
* yearly_quota

3. leave_balances

* user_id
* leave_type_id
* remaining_days

4. leave_requests

* id
* user_id
* leave_type_id
* start_date
* end_date
* days
* reason
* status (PENDING, APPROVED, REJECTED)
* manager_id
* created_at

5. audit_logs

* id
* leave_request_id
* action
* action_by
* comment
* timestamp

6. holidays

* id
* date
* name

---

# ⚙️ BACKEND REQUIREMENTS

Use Express with clean architecture:

backend/

* controllers/
* routes/
* middleware/
* models/
* utils/
* config/
* server.js

---

# 🔐 MIDDLEWARE

1. authMiddleware

* Verify JWT
* Attach req.user

2. roleMiddleware

* authorize(...roles)

---

# 🧠 BUSINESS LOGIC

---

## 📝 Leave Application

POST /api/leaves/apply

Fields:

* leave_type_id
* start_date
* end_date
* reason
* manager_id

Logic:

* Validate all fields
* Calculate working days:

  * Exclude weekends (Saturday, Sunday)
  * Exclude holidays (from holidays table)
* Prevent overlapping leave requests
* Check leave balance before applying
* Save request with status = PENDING

---

## 📄 Employee Dashboard

GET /api/dashboard

Return:

* Leave balances per type
* Leave history
* Filter by status/date

---

## 👨‍💼 Manager Features

GET /api/manager/pending

* List all pending leave requests
* Include employee name

PUT /api/manager/action/:id

* Approve or Reject
* Add optional comment
* Store action in audit_logs
* If APPROVED:

  * Check balance again
  * Deduct leave balance
* Prevent double approval/rejection

---

## 📅 Team Calendar

GET /api/calendar

* Show approved leaves for:

  * Current week
  * Next week
* Include employee name + leave type
* Filter by leave type

---

# 🌱 SEED DATA

Insert:

* 3 managers
* 5+ employees
* Leave types
* Leave balances
* Sample leave requests
* Holidays

All passwords must be bcrypt hashed.

---

# ⚠️ IMPORTANT (Codespaces)

* DO NOT use localhost database
* Use environment variables for DB connection
* Support remote MySQL connection
* Include SSL config if required

---

# 📊 API STANDARDS

* Use proper HTTP status codes
* Validate inputs server-side
* APIs must work in Postman without frontend

---

# 🎨 FRONTEND REQUIREMENTS (React)

Create pages:

1. Login Page
2. Register Page
3. Employee Dashboard
4. Apply Leave Form
5. Manager Panel
6. Calendar View

---

## Frontend Features

* Use Axios for API calls
* Store JWT in localStorage
* Protected routes
* Role-based UI rendering
* Manager dropdown in leave form
* Show leave balance
* Show leave history
* Filter by status/date

---

# 📁 FRONTEND STRUCTURE

frontend/src/

* pages/
* components/
* services/api.js
* context/AuthContext.js

---

# 🎯 FINAL GOAL

Build a production-ready leave management system with:

* Clean architecture
* Proper validation
* Role-based access
* Working backend APIs
* Fully functional React frontend

Generate full working code for both backend and frontend.
