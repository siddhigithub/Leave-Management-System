const db = require('./config/db');
const bcrypt = require('bcryptjs');

async function seed() {
  // Create tables
  await db.execute(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role ENUM('ADMIN', 'MANAGER', 'EMPLOYEE'),
    manager_id INT
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS leave_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    yearly_quota INT
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS leave_balances (
    user_id INT,
    leave_type_id INT,
    remaining_days INT,
    PRIMARY KEY (user_id, leave_type_id)
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    leave_type_id INT,
    start_date DATE,
    end_date DATE,
    days INT,
    reason TEXT,
    status ENUM('PENDING', 'APPROVED', 'REJECTED'),
    manager_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    leave_request_id INT,
    action VARCHAR(255),
    action_by INT,
    comment TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS holidays (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    name VARCHAR(255)
  )`);

// Seed data
  const hashed = await bcrypt.hash('password', 10);

  // Managers
  const [result1] = await db.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', ['Manager One', 'manager1@example.com', hashed, 'MANAGER']);
  const [result2] = await db.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', ['Manager Two', 'manager2@example.com', hashed, 'MANAGER']);
  const [result3] = await db.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', ['Manager Three', 'manager3@example.com', hashed, 'MANAGER']);

  // Employees
  const [emp1] = await db.execute('INSERT INTO users (name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?)', ['Employee One', 'emp1@example.com', hashed, 'EMPLOYEE', result1.insertId]);
  const [emp2] = await db.execute('INSERT INTO users (name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?)', ['Employee Two', 'emp2@example.com', hashed, 'EMPLOYEE', result1.insertId]);
  const [emp3] = await db.execute('INSERT INTO users (name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?)', ['Employee Three', 'emp3@example.com', hashed, 'EMPLOYEE', result2.insertId]);
  const [emp4] = await db.execute('INSERT INTO users (name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?)', ['Employee Four', 'emp4@example.com', hashed, 'EMPLOYEE', result2.insertId]);
  const [emp5] = await db.execute('INSERT INTO users (name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?)', ['Employee Five', 'emp5@example.com', hashed, 'EMPLOYEE', result3.insertId]);

  // Leave types
  const [sick] = await db.execute('INSERT INTO leave_types (name, yearly_quota) VALUES (?, ?)', ['Sick', 10]);
  const [casual] = await db.execute('INSERT INTO leave_types (name, yearly_quota) VALUES (?, ?)', ['Casual', 12]);
  const [wfh] = await db.execute('INSERT INTO leave_types (name, yearly_quota) VALUES (?, ?)', ['WFH', 5]);
  const [compoff] = await db.execute('INSERT INTO leave_types (name, yearly_quota) VALUES (?, ?)', ['Comp-off', 2]);

  // Balances for employees
  const users = [emp1.insertId, emp2.insertId, emp3.insertId, emp4.insertId, emp5.insertId];
  const types = [sick.insertId, casual.insertId, wfh.insertId, compoff.insertId];
  const quotas = [10, 12, 5, 2];

  for (const user of users) {
    for (let i = 0; i < types.length; i++) {
      await db.execute('INSERT INTO leave_balances (user_id, leave_type_id, remaining_days) VALUES (?, ?, ?)', [user, types[i], quotas[i]]);
    }
  }

  // Holidays
  await db.execute('INSERT INTO holidays (date, name) VALUES (?, ?)', ['2024-01-01', 'New Year']);
  await db.execute('INSERT INTO holidays (date, name) VALUES (?, ?)', ['2024-12-25', 'Christmas']);

  // Sample leave requests
  await db.execute('INSERT INTO leave_requests (user_id, leave_type_id, start_date, end_date, days, reason, status, manager_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [emp1.insertId, casual.insertId, '2024-05-10', '2024-05-12', 3, 'Vacation', 'PENDING', result1.insertId]);

  console.log('Database seeded');
}

seed().catch(console.error);