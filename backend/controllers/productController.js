import Product from '../models/product.js';

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category, unit } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    const imagePaths = req.files?.map(file => file.filename) || [];

    const product = new Product({
      name,
      price,
      stock,
      description,
      category,
      unit,
      images: imagePaths,
      seller: req.user._id
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add your other functions (getProducts, getProductById, etc.) here

