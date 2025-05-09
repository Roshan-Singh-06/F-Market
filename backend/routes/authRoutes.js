import express from 'express';
import { register, login, registerSeller } from '../controllers/UserController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/register-seller', registerSeller);

export default router;
