const LeaveRequest = require('../models/LeaveRequest');
const LeaveBalance = require('../models/LeaveBalance');
const { calculateWorkingDays } = require('../utils/helpers');

exports.applyLeave = async (req, res) => {
  const { leave_type_id, start_date, end_date, reason, manager_id } = req.body;
  const user_id = req.user.id;

  if (!leave_type_id || !start_date || !end_date || !reason) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const start = new Date(start_date);
  const end = new Date(end_date);
  if (start > end) return res.status(400).json({ error: 'Invalid dates' });

  const days = await calculateWorkingDays(start, end);

  const balance = await LeaveBalance.getBalance(user_id, leave_type_id);
  if (balance < days) return res.status(400).json({ error: 'Insufficient balance' });

  const overlap = await LeaveRequest.checkOverlap(user_id, start, end);
  if (overlap) return res.status(400).json({ error: 'Overlapping leave' });

  const id = await LeaveRequest.create({ user_id, leave_type_id, start_date, end_date, days, reason, status: 'PENDING', manager_id });
  res.status(201).json({ message: 'Leave applied', id });
};