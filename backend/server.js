require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Montar rutas
const chatRoute = require('./routes/chat');
app.use('/chat', chatRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});