const db = require('../config/db');

class User {
  static async create(user) {
    const managerId = user.manager_id === undefined ? null : user.manager_id;
    const [result] = await db.execute('INSERT INTO users (name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?)', [user.name, user.email, user.password, user.role, managerId]);
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  }

  static async getManagers() {
    const [rows] = await db.execute('SELECT id, name FROM users WHERE role = "MANAGER"');
    return rows;
  }
}

module.exports = User;