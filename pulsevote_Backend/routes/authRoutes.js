// routes/authRoutes.js
const express = require("express");
const { body } = require("express-validator");
const { registerUser, registerManager, registerAdmin, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");
const { registerLimiter, loginLimiter} = require("../middleware/rateLimiter")

const router = express.Router();

// Validators
const emailValidator = body("email")
  .isEmail().withMessage("Email must be valid")
  .normalizeEmail();

const passwordValidator = body("password")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
  .matches(/[A-Za-z]/).withMessage("Password must include a letter")
  .matches(/\d/).withMessage("Password must include a number")
  .trim()
  .escape();



// Routes 


router.post("/register-user", registerLimiter, [emailValidator, passwordValidator], registerUser);
router.post("/register-manager", protect, requireRole("admin"), registerLimiter, [emailValidator, passwordValidator], registerManager);
router.post("/register-admin", registerLimiter, [emailValidator, passwordValidator], registerAdmin);

router.post("/login", loginLimiter, [emailValidator, body("password").notEmpty().trim().escape()], login);


module.exports = router;