import express from 'express';
import { register, login, registerSeller, getUserProfile } from '../controllers/UserController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { loginSeller } from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/register-seller', registerSeller);
router.get('/me', verifyJWT, getUserProfile);
router.post('/seller-login', loginSeller);

router.post('/', upload.array('images'), addProduct);

export default router;
