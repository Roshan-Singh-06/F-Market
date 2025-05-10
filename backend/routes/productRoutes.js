import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Routes
router.post('/', verifyJWT, upload.array('images'), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', verifyJWT, upload.array('images'), updateProduct);
router.delete('/:id', verifyJWT, deleteProduct);

export default router;
