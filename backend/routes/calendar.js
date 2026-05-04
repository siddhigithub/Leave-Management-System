const express = require('express');
const { getCalendar } = require('../controllers/calendarController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getCalendar);

module.exports = router;