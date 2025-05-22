const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth'); // Your JWT auth middleware

// Create or update profile
router.post('/profile', auth, upload.single('image'), farmerController.createOrUpdateProfile);

// Get all farmers
router.get('/all', farmerController.getAllFarmers);

module.exports = router;