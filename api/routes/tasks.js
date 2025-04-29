const express = require('express');
const router = express.Router();

let tasks = [];

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title, description,assignedTo } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (!description || description.trim() === '') {
    return res.status(400).json({ error: 'Description is required' });
  }

  const task = { id: tasks.length + 1, title, description,assignedTo, status: 'Pending', createdAt: Date.now() };
  tasks.push(task);
  res.status(201).json(task);
});

router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.status = 'Completed';
  res.json(task);
});

module.exports = router;
