const db = require('../config/db');

class AuditLog {
  static async create(log) {
    await db.execute('INSERT INTO audit_logs (leave_request_id, action, action_by, comment, timestamp) VALUES (?, ?, ?, ?, NOW())', [log.leave_request_id, log.action, log.action_by, log.comment]);
  }
}

module.exports = AuditLog;