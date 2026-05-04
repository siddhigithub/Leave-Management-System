const express = require('express');
const { applyLeave } = require('../controllers/leaveController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', auth, applyLeave);

module.exports = router;