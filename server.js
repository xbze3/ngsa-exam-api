const cors = require("cors");
const express = require("express");
require("dotenv").config({ quiet: true });

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const connectDb = require("./src/config/db");
const ngsaRoutes = require("./src/routes/ngsaRoutes");

const app = express();

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /:
 *   get:
 *     summary: API welcome endpoint
 *     description: Returns general information about the NGSA Exam API including available endpoints and documentation links.
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: API information returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: NGSA Exam API
 *                 version:
 *                   type: string
 *                   example: "1.0"
 *                 description:
 *                   type: string
 *                   example: REST API for retrieving and grading NGSA exam questions.
 *                 baseRoute:
 *                   type: string
 *                   example: /ngsa
 *                 liveService:
 *                   type: string
 *                   example: https://ngsa-exam-api.onrender.com
 *                 documentation:
 *                   type: string
 *                   example: /docs
 *                 message:
 *                   type: string
 *                   example: Welcome to the NGSA Exam API!
 */
app.get("/", (req, res) => {
    res.status(200).json({
        name: "NGSA Exam API",
        version: "1.0",
        description: "REST API for retrieving and grading NGSA exam questions.",
        baseRoute: "/ngsa",
        liveService: "https://ngsa-exam-api.onrender.com",
        documentation: "/docs",
        message: "Welcome to the NGSA Exam API.",
    });
});

/**
 * @openapi
 * /healthcheck:
 *   get:
 *     summary: Health check endpoint
 *     description: Used to verify that the API service is running and reachable.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: API is up and running!
 */
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
