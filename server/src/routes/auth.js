import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router(); //part of express and it makes the code modular, matlab it seperates al routes into files

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    await User.create({ name, email, password }); //we can use the new keyword also

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    // Handle duplicate key error just in case
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }

    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({ token });
});


export default router; // whatever is exported here is authroutes to the index.js file 
