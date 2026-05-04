const db = require('../config/db');

class Holiday {
  static async isHoliday(date) {
    const dateStr = date.toISOString().split('T')[0];
    const [rows] = await db.execute('SELECT * FROM holidays WHERE date = ?', [dateStr]);
    return rows.length > 0;
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM holidays');
    return rows;
  }
}

module.exports = Holiday;