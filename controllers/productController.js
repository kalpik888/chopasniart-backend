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

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);

        // specific check: if the ID is formatted wrong (not a valid ObjectId), return 404 instead of 500
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = { createProduct, getProducts, getProductsByCategory , getProductById};