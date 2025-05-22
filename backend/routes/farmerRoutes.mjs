import express from 'express';
import { createOrUpdateProfile, getAllFarmers } from '../controllers/farmerController.js';
import upload from '../middleware/multer.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create or update farmer profile
router.post('/profile', verifyJWT, upload.single('image'), createOrUpdateProfile);

// Get all farmers
router.get('/all', getAllFarmers);

export default router;
