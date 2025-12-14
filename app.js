require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');


// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON data

// Routes
app.use('/api/products', productRoutes);

// Health Check Route (Good for testing server status)
app.get('/', (req, res) => {
    res.send('Chopasni Art Emporium');
});

module.exports = app;