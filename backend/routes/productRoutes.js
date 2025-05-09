import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyJWT, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', verifyJWT, updateProduct);
router.delete('/:id', verifyJWT, deleteProduct);

export default router;