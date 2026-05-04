const db = require('../config/db');

class LeaveType {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM leave_types');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM leave_types WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = LeaveType;