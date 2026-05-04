const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  const managers = await User.getManagers();
  res.json(managers);
});

module.exports = router;