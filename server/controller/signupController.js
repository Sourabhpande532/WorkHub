require("dotenv").config();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const { check, validationResult } = require("express-validator");

exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      createError({ status: 400, message: "All Fields are required." }),
    );
  }
  const exits = await User.findOne({ email });
  if (exits) {
    return res.status(409).send("user already exits");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    newUser.password = undefined;
    return res.status(201).json({
      success: true,
      message: "User Successfully added to database",
      user: newUser,
    });
  } catch (error) {
    console.error(error.message);
    return next(`register ${error}`);
  }
};

exports.signin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const { email, password } = req.body;

  if (!(email && password)) {
    return next(createError({ status: 400, message: "Both fields required" }));
  }

  const user = await User.findOne({ email }).select("name password");
  if (!user) {
    return next(createError({ status: 404, message: "User not found" }));
  }

  const isMatch = await bcrypt.compare(password.trim(), user.password);
  if (!isMatch) {
    return next(createError({ status: 400, message: "Password incorrect" }));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  user.password = undefined;
  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: true, // REQUIRED on https
      sameSite: "none", // REQUIRED for cross-site
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "User Logout!" });
};

exports.isLoggedIn = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ loggedIn: true });
  } catch (err) {
    return res.status(401).json({ loggedIn: false });
  }
};
