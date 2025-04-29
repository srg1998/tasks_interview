const express = require('express');
const router = express.Router();

let users = [
  { id: 1, username: 'admin', password: 'admin', role: 'admin' },
  { id: 2, username: 'user', password: 'user', role: 'user' },
  { id: 3, username: 'user2', password: 'user2', role: 'user' }
];



// Route for login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({
      success: true,
      message: 'Login successful',
      role: user.role,
      username:user.username
    });
  } else { 
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});


router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;