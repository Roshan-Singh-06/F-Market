import express from 'express';
import upload from '../middleware/multer.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.post('/', verifyJWT, upload.array('images'), createProduct);  // Create product with images
router.get('/', getProducts);  // Get all products
router.get('/:id', getProductById);  // Get a product by ID
router.put('/:id', verifyJWT, upload.array('images'), updateProduct);  // Update product with images
router.delete('/:id', verifyJWT, deleteProduct);  // Delete product by ID

export default router;

