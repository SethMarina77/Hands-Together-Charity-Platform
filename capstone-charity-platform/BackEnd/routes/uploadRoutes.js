import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/userSchema.js';
import { authenticateToken } from '../helpers/authMiddleware.js';
import Charity from '../models/charitySchema.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer storage for local storage (uploads folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for images
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// File upload route (local image storage)
router.post('/upload-profile-image', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Update URL construction to use relative path
    const imageUrl = `/uploads/${req.file.filename}`;
    console.log('Image URL:', imageUrl);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Updated user:', user); // Debug
    res.json({ imageUrl, user });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

//CHARITY POST IMAGE UPLOAD
router.post('/upload-post-image', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    // Debug logs
    console.log("Full request user object:", req.user);
    console.log("User ID type:", typeof req.user._id);
    console.log("Raw user ID value:", req.user._id);

    const { title, category, summary } = req.body;
    const postImageUrl = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.png';
    
    // Create object and log it
    const postData = {
      image: postImageUrl,
      title,
      category,
      summary,
      createdBy: req.user.id // This might need to be req.user.id depending on your JWT payload
    };
    
    console.log("Post data being sent to create:", postData);
    
    const post = await Charity.create(postData);
    console.log('Post created:', post);
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Full error object:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Profile update route
router.patch('/update-profile', authenticateToken, async (req, res) => {
  try {
    const { profileImage } = req.body;
    console.log('Updating profile:', req.user.id, profileImage);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage },
      { new: true }
    ).select('-password'); // Exclude password for security reasons

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Update failed' });
  }
});

export default router;
