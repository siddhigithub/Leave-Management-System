const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Leave Management API is running. Use the React frontend at http://localhost:5173');
});

// routes
const authRoutes = require('./routes/auth');
const leaveRoutes = require('./routes/leaves');
const managerRoutes = require('./routes/manager');
const dashboardRoutes = require('./routes/dashboard');
const calendarRoutes = require('./routes/calendar');
const leaveTypesRoutes = require('./routes/leaveTypes');
const managersRoutes = require('./routes/managers');

app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/leave-types', leaveTypesRoutes);
app.use('/api/managers', managersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));