const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Just log the error, DO NOT kill the process
        console.error(`MongoDB Connection Error: ${error.message}`);

        // process.exit(1);  <-- DELETE OR COMMENT OUT THIS LINE
    }
};

module.exports = connectDB;