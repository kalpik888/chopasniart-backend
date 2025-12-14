const Product = require('../models/Product');

// @desc    Upload a product
// @route   POST /api/products
const createProduct = async (req, res) => {
    console.log('Received request to create product');
    try {
        // req.file contains information about the uploaded file from Cloudinary
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const { name, description, category } = req.body;

        const newProduct = new Product({
            name,
            description,
            category,
            imageUrl: req.file.path,      // Cloudinary URL
            imageId: req.file.filename    // Cloudinary Public ID
        });

        console.log('Creating product with data:', newProduct);

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        // Case-insensitive search for category
        const products = await Product.find({ category: { $regex: category, $options: 'i' } }).sort({ createdAt: -1 });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category' });
        }

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createProduct, getProducts, getProductsByCategory };