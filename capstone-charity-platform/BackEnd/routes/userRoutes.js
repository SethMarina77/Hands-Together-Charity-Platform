import { Router } from 'express';
import User from '../models/userSchema.js';
const router = Router()
import { authenticateToken } from '../helpers/authMiddleware.js';

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(currentUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// the '/' does not have any text because it is defined in the index.js as /api/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

//lets you delete a user on an admin account
router.delete("/users/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
});



export default router;