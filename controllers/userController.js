const User = require("./../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const signUp = async (req, res) => {
  try {
    const addUser = new User(req.body);
    await addUser.save();
    res.status(200).json(addUser);
  } catch (err) {
    res.status(401).json(err.message);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) res.status(200).json(user);
    else res.status(401).json("No User Found");
  } catch (err) {
    res.status(401).json(err.message);
  }
};

module.exports = { signUp, signIn };
