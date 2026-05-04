const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, role = 'EMPLOYEE', manager_id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const userId = await User.create({ name, email, password: hashedPassword, role, manager_id });
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};