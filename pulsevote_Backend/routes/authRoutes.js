// routes/authRoutes.js
const express = require("express");
const { body } = require("express-validator");
const { registerUser, registerManager, registerAdmin, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

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



// Routes - Fixed syntax according to documentation
router.post("/register-user", [emailValidator, passwordValidator], registerUser);
router.post("/register-manager", protect, requireRole("admin"), [emailValidator, passwordValidator], registerManager);
router.post("/register-admin", [emailValidator, passwordValidator], registerAdmin);
router.post("/login", [emailValidator, body("password").notEmpty().trim().escape()], login);

module.exports = router;