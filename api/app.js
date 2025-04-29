const express = require('express');
const app = express();
const PORT = 3000;

const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const cors = require('cors');
app.use(cors());  
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes); 

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});