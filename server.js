const cors = require("cors");
const express = require("express");
require("dotenv").config({ quiet: true });

const connectDb = require("./src/config/db");
const ngsaRoutes = require("./src/routes/ngsaRoutes");

const app = express();

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the NGSA Exam API!",
    });
});

app.get("/healthcheck", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "API is up and running!",
    });
});

app.use("/ngsa", ngsaRoutes);

async function startServer() {
    try {
        await connectDb(MONGODB_URI);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

startServer();
