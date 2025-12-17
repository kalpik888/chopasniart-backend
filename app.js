require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const rateLimit = require('express-rate-limit');


// Connect Database
connectDB();

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window (15 mins)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests from this IP, please try again after 15 minutes."
});

app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON data

// Routes
app.use('/api/products', productRoutes);

// Health Check Route (Good for testing server status)
app.get('/', (req, res) => {
    res.send('Chopasni Art Emporium');
});

app.use('/api/contact', contactRoutes);  // Your NEW contact form

module.exports = app;