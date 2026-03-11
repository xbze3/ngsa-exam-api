const cors = require("cors");
const express = require("express");
require("dotenv").config({ quiet: true });

const connectDb = require("./src/config/db");
const ngsaRoutes = require("./src/routes/ngsaRoutes");

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

connectDb(MONGODB_URI);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to the NGSA Exam API!",
    });
});

app.get("/healthcheck", (req, res) => {
    res.send({
        message: "API up and running!",
    });
});

app.use("/ngsa", ngsaRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
