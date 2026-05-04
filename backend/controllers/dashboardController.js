const LeaveBalance = require('../models/LeaveBalance');
const LeaveRequest = require('../models/LeaveRequest');

exports.getDashboard = async (req, res) => {
  const user_id = req.user.id;
  const balances = await LeaveBalance.getAllForUser(user_id);
  const history = await LeaveRequest.getHistory(user_id);
  res.json({ balances, history });
};