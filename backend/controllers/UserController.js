const User = require('../models/user');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/asyncHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = {
    register,
    login
};