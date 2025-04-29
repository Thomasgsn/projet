const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/tasks');

app.use('/tasks', taskRoutes);

app.get('/health', (req, res) => {
    res.send('OK');
});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
