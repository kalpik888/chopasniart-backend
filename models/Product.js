const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'Table', 'Chair', 'Decor'
    imageUrl: { type: String, required: true }, // URL from Cloudinary
    imageId: { type: String, required: true },  // ID to delete image later if needed
    inStock: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);