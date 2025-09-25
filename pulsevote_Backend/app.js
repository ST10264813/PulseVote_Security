const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  next();
});

// Middlewares
app.use(
helmet.contentSecurityPolicy({
    directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://apis.google.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'", "http://localhost:5000"], // or whichever port you use
    },
})
);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse form data

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const organisationRoutes = require("./routes/organisationRoutes");
app.use("/api/organisations", organisationRoutes);

const pollRoutes = require("./routes/pollRoutes");
app.use("/api/polls", pollRoutes);



// Test routes
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

// Protected route
const { protect } = require("./middleware/authMiddleware");
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
    timestamp: new Date()
  });
});

module.exports = app;
