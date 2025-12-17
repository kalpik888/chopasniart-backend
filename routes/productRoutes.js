const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { createProduct, getProducts, getProductsByCategory, getProductById } = require('../controllers/productController');

// 👇 CHANGE THIS SECTION
router.post('/', (req, res, next) => {
    // We wrap the upload middleware to catch its internal errors
    upload.single('image')(req, res, (err) => {
        if (err) {
            // This will print the EXACT error from Cloudinary/Multer
            console.error("❌ Upload Middleware Error:", err);
            return res.status(400).json({
                message: "Image upload failed",
                error: err.message || err
            });
        }
        // If no error, proceed to your controller
        console.log("✅ Image uploaded to Cloudinary. Moving to controller...");
        next();
    });
}, createProduct);

router.get('/', getProductsByCategory);

router.get('/:id', getProductById);                             

module.exports = router;