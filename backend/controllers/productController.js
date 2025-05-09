import Product from '../models/product.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    if (!name || !description || !price || !category) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock: stock || 0,
        seller: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, product, "Product created successfully")
    );
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate('seller', 'email sellerProfile');
    return res.status(200).json(
        new ApiResponse(200, products, "Products retrieved successfully")
    );
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller', 'email sellerProfile');
    
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(
        new ApiResponse(200, product, "Product retrieved successfully")
    );
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (product.seller.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update your own products");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedProduct, "Product updated successfully")
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (product.seller.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own products");
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, null, "Product deleted successfully")
    );
});

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};