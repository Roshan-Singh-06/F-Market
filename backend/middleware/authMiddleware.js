import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../models/user.js';

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.replace('Bearer ', '');

        if (!token) {
            throw new ApiError(401, 'Unauthorized request');
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'your-fallback-secret');
        const user = await User.findById(decodedToken?.userId).select('-password');

        if (!user) {
            throw new ApiError(401, 'Invalid access token');
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid access token');
    }
});

export { verifyJWT };
