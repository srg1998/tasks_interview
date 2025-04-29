const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'Admin User', role: 'admin' },
  { id: 2, name: 'Regular User', role: 'user' }
];

router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;