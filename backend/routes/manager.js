const express = require('express');
const { getPending, action } = require('../controllers/managerController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/pending', auth, role('MANAGER'), getPending);
router.put('/action/:id', auth, role('MANAGER'), action);

module.exports = router;