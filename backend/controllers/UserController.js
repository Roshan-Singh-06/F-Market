import User from '../models/user.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-fallback-secret', {
        expiresIn: '1d'
    });
};

const register = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, "Email already registered");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            email,
            password: hashedPassword
        });

        // Generate token
        const accessToken = generateAccessToken(user._id);

        // Remove password from response
        const createdUser = user.toObject();
        delete createdUser.password;

        return res.status(201).json(
            new ApiResponse(201, {
                user: createdUser,
                accessToken
            }, "User registered successfully")
        );
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Something went wrong while registering the user");
    }
});

const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        // Verify password 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid email or password");
        }

        // Generate token
        const accessToken = generateAccessToken(user._id);
        const userRole = user.role;

        // Remove password from response
        const loggedInUser = user.toObject();
        delete loggedInUser.password;

        return res.status(200).json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken
            }, "Login successful")
        );
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Something went wrong while logging in");
    }
});

const registerSeller = asyncHandler(async (req, res) => {
    try {
        const { 
            email, 
            username, 
            description, 
            categories, 
            password 
        } = req.body;

        // Validate required fields
        if (!email || !username || !description || !categories || !password) {
            throw new ApiError(400, "All fields are required");
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }

        // Validate username length
        if (username.length < 3) {
            throw new ApiError(400, "Username must be at least 3 characters long");
        }

        // Validate description length (minimum 5 words)
        if (description.split(' ').length < 5) {
            throw new ApiError(400, "Description must be at least one complete sentence");
        }

        // Validate categories
        const validCategories = ['Vegetables', 'Pulses', 'Rice', 'Wheat', 'Jowar'];
        const isValidCategories = categories.every(cat => validCategories.includes(cat));
        if (!isValidCategories) {
            throw new ApiError(400, "Invalid categories selected");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, "Email already registered");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with seller profile
        const user = await User.create({
            email,
            password: hashedPassword,
            role: 'seller',
            isSeller: true,
            sellerProfile: {
                username,
                description,
                categories,
                verified: false,
                createdAt: new Date()
            }
        });

        // Generate token
        const accessToken = generateAccessToken(user._id);

        // Remove password from response
        const createdUser = user.toObject();
        delete createdUser.password;

        return res.status(201).json(
            new ApiResponse(201, {
                user: createdUser,
                accessToken
            }, "Seller registered successfully")
        );
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Something went wrong while registering the seller");
    }
});


const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

      

const loginSeller = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user
        const user = await User.findOne({ email });
        if (!user || !user.isSeller) {
            return res.status(401).json({
                message: "Invalid credentials or not a seller account"
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Generate token
        const accessToken = generateAccessToken(user._id);

        // Send response
        return res.status(200).json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                    isSeller: user.isSeller,
                    sellerProfile: user.sellerProfile
                },
                accessToken
            },
            message: "Login successful"
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Something went wrong during login"
        });
    }
});

export {
    register,
    login,
    registerSeller,
     getUserProfile,
      loginSeller
};