const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    phone: {
        type: String,
        required: false // Explicitly marking it as optional
    },
    message: {
        type: String,
        required: [true, 'Please add a message']
    },
    status: {
        type: String,
        enum: ['New', 'In Progress', 'Resolved'],
        default: 'New'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// This creates a collection named "contacts" in your DB (separate from "products")
module.exports = mongoose.model('Contact', contactSchema);