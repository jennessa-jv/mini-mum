import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router(); //part of express and it makes the code modular, matlab it seperates al routes into files

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });

  res.status(201).json({ message: "User registered" });
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
