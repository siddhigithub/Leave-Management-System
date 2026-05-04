const db = require('../config/db');
const LeaveRequest = require('../models/LeaveRequest');

exports.getCalendar = async (req, res) => {
  const { week } = req.query; // 'current' or 'next'
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  let start, end;
  if (week === 'next') {
    start = new Date(endOfWeek);
    start.setDate(endOfWeek.getDate() + 1);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  } else {
    start = startOfWeek;
    end = endOfWeek;
  }

  const startStr = start.toISOString().split('T')[0];
  const endStr = end.toISOString().split('T')[0];
  const [rows] = await db.execute('SELECT lr.start_date, lr.end_date, u.name as employee_name, lt.name as leave_type FROM leave_requests lr JOIN users u ON lr.user_id = u.id JOIN leave_types lt ON lr.leave_type_id = lt.id WHERE lr.status = "APPROVED" AND lr.start_date <= ? AND lr.end_date >= ?', [endStr, startStr]);
  res.json(rows);
};