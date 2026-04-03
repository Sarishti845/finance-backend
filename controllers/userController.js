const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

   const userObj = user.toObject();
   delete userObj.password;

  res.status(201).json({
  message: "User created",
  user: userObj
 });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    res.json({
      message: "Role updated",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: "User status updated",
      isActive: user.isActive
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};