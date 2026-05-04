const express = require('express');
const LeaveType = require('../models/LeaveType');

const router = express.Router();

router.get('/', async (req, res) => {
  const types = await LeaveType.getAll();
  res.json(types);
});

module.exports = router;