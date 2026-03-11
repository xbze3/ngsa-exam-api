const mongoose = require("mongoose");

async function connectDB(URI) {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
