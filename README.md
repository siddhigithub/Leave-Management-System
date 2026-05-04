# Leave Management System

A full-stack leave management application with React frontend and Node.js/Express backend, using a cloud MySQL database.

## Features

- User authentication with JWT
- Role-based access (Admin, Manager, Employee)
- Leave application and approval workflow
- Leave balance tracking
- Team calendar view
- Audit logs for actions

## Setup

### Database

1. Create a PlanetScale account at https://planetscale.com
2. Create a new database
3. Get the connection string (DATABASE_URL)

### Backend

1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. Update `.env` with your DATABASE_URL and JWT_SECRET
4. Seed the database: `node seed.js`
5. Start the server: `npm run dev`

### Frontend

1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Usage

- Register/Login as Employee, Manager, or Admin
- Employees can apply for leave and view their dashboard
- Managers can approve/reject leave requests
- View team calendar for approved leaves

## API Endpoints

- POST /api/auth/register
- POST /api/auth/login
- POST /api/leaves/apply
- GET /api/dashboard
- GET /api/manager/pending
- PUT /api/manager/action/:id
- GET /api/calendar