import express from 'express';
import { register, login, registerSeller, getUserProfile, getActiveUserCount } from '../controllers/UserController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { loginSeller } from '../controllers/UserController.js';
import upload from '../middleware/multer.js';
import { createProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/register-seller', registerSeller);
router.get('/me', verifyJWT, getUserProfile);
router.post('/seller-login', loginSeller);

router.post('/', upload.array('images'), createProduct);
router.get('/active-count', getActiveUserCount);

export default router;
