const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(helmet());

//middleware
app.use(cors({
  origin: "https://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get('/test', (req, res) => {
  res.json({
    message: "Hello from PulseVote backend!",
    timestamp: new Date(),
    votes: [10, 20, 30]
  });
});

app.get('/', (req, res) => {
  res.send('PulseVote API running!');
});

const { protect } = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
    timestamp: new Date()
  });
});

module.exports = app;
