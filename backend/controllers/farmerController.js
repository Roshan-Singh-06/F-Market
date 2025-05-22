import Farmer from '../models/farmer.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create or update farmer profile
export const createOrUpdateProfile = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  let imageUrl = req.body.imageUrl;

  if (req.file) {
    imageUrl = `/uploads/farmers/${req.file.filename}`;
  }

  let farmer = await Farmer.findOne({ user: req.user._id });

  if (farmer) {
    // Update
    farmer.name = name;
    farmer.description = description;
    if (imageUrl) farmer.imageUrl = imageUrl;
    await farmer.save();
  } else {
    // Create
    farmer = new Farmer({
      user: req.user._id,
      name,
      description,
      imageUrl,
    });
    await farmer.save();
  }

  res.json({ profile: farmer });
});

// Get all farmers
export const getAllFarmers = asyncHandler(async (req, res) => {
  const farmers = await Farmer.find().populate('user', 'email');
  res.json({ farmers });
});