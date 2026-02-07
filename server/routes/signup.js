const express = require("express");
const app = express.Router();
const { check } = require("express-validator");
const {
  registerUser,
  signin,
  logout,
} = require("../controller/signupController");

app.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name must be at least 4 chars long"),
    check("email", "Email is required").isEmail(),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Password Must be at least 4 chars long"),
  ],
  registerUser,
);

app.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password")
      .isLength({ min: 3 })
      .withMessage("field is required compulsory"),
  ],
  signin,
);

app.get("/logout", logout);

module.exports = app;
