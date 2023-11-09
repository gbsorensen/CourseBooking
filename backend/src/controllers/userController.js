const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(400).json({ error: "Username is taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (!existingUser) {
      return res.status(404).json({ error: "No user found" });
    }

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return res.status(404).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET
    );

    res.status(201).json({ username: req.body.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
