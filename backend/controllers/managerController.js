const LeaveRequest = require('../models/LeaveRequest');
const AuditLog = require('../models/AuditLog');
const LeaveBalance = require('../models/LeaveBalance');

exports.getPending = async (req, res) => {
  const manager_id = req.user.id;
  const requests = await LeaveRequest.getPendingForManager(manager_id);
  res.json(requests);
};

exports.action = async (req, res) => {
  const { id } = req.params;
  const { action, comment } = req.body; // 'APPROVE' or 'REJECT'
  const manager_id = req.user.id;

  const request = await LeaveRequest.findById(id);
  if (!request || request.manager_id !== manager_id || request.status !== 'PENDING') {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
  await LeaveRequest.updateStatus(id, status);
  await AuditLog.create({ leave_request_id: id, action, action_by: manager_id, comment });

  if (status === 'APPROVED') {
    await LeaveBalance.deduct(request.user_id, request.leave_type_id, request.days);
  }

  res.json({ message: 'Action taken' });
};