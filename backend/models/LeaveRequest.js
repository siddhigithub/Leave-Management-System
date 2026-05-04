const db = require('../config/db');

class LeaveRequest {
  static async create(request) {
    const [result] = await db.execute('INSERT INTO leave_requests (user_id, leave_type_id, start_date, end_date, days, reason, status, manager_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())', [request.user_id, request.leave_type_id, request.start_date, request.end_date, request.days, request.reason, request.status, request.manager_id]);
    return result.insertId;
  }

  static async checkOverlap(user_id, start, end) {
    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];
    const [rows] = await db.execute('SELECT * FROM leave_requests WHERE user_id = ? AND status IN ("PENDING", "APPROVED") AND ((start_date <= ? AND end_date >= ?) OR (start_date <= ? AND end_date >= ?))', [user_id, endStr, startStr, startStr, endStr]);
    return rows.length > 0;
  }

  static async updateStatus(id, status) {
    await db.execute('UPDATE leave_requests SET status = ? WHERE id = ?', [status, id]);
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM leave_requests WHERE id = ?', [id]);
    return rows[0];
  }

  static async getHistory(user_id) {
    const [rows] = await db.execute('SELECT lr.*, lt.name as leave_type FROM leave_requests lr JOIN leave_types lt ON lr.leave_type_id = lt.id WHERE lr.user_id = ? ORDER BY created_at DESC', [user_id]);
    return rows;
  }

  static async getPendingForManager(manager_id) {
    const [rows] = await db.execute('SELECT lr.*, u.name as employee_name, lt.name as leave_type FROM leave_requests lr JOIN users u ON lr.user_id = u.id JOIN leave_types lt ON lr.leave_type_id = lt.id WHERE lr.manager_id = ? AND lr.status = "PENDING"', [manager_id]);
    return rows;
  }
}

module.exports = LeaveRequest;