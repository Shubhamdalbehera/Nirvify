import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const userRoutes = express.Router();

// Signup route
userRoutes.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "User already exists." });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res
    .status(201)
    .json({ status: true, message: "User registered successfully." });
});

// Login route
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User is not registered." });
  }

  const validpassword = await bcrypt.compare(password, user.password);
  if (!validpassword) {
    return res.status(401).json({ message: "Password is incorrect." });
  }

  // Role-based redirection
  if (user.role === "admin") {
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({
      status: true,
      message: "Admin login successful",
      role: "admin",
    });
  } else {
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({
      status: true,
      message: "User login successful",
      role: "user",
    });
  }
});

// Logout route
userRoutes.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});

userRoutes.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select(
      "username email role"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete user route
userRoutes.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default userRoutes;
