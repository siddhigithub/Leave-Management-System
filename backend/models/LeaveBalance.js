const db = require('../config/db');

class LeaveBalance {
  static async getBalance(user_id, leave_type_id) {
    const [rows] = await db.execute('SELECT remaining_days FROM leave_balances WHERE user_id = ? AND leave_type_id = ?', [user_id, leave_type_id]);
    return rows[0]?.remaining_days || 0;
  }

  static async getAllForUser(user_id) {
    const [rows] = await db.execute('SELECT lt.name, lb.remaining_days FROM leave_balances lb JOIN leave_types lt ON lb.leave_type_id = lt.id WHERE lb.user_id = ?', [user_id]);
    return rows;
  }

  static async deduct(user_id, leave_type_id, days) {
    await db.execute('UPDATE leave_balances SET remaining_days = remaining_days - ? WHERE user_id = ? AND leave_type_id = ?', [days, user_id, leave_type_id]);
  }

  static async create(user_id, leave_type_id, remaining_days) {
    await db.execute('INSERT INTO leave_balances (user_id, leave_type_id, remaining_days) VALUES (?, ?, ?)', [user_id, leave_type_id, remaining_days]);
  }
}

module.exports = LeaveBalance;