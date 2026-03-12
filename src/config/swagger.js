const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NGSA Exam API",
            version: "1.0",
            description:
                "REST API for retrieving and grading NGSA exam questions.",
        },
        servers: [
            {
                url: "https://ngsa-exam-api.onrender.com",
                description: "Production Server",
            },
            {
                url: "http://localhost:8080",
                description: "Your Local Server",
            },
        ],
        tags: [
            { name: "Root", description: "Root API routes" },
            { name: "Health", description: "Health check routes" },
            { name: "Exams", description: "Exam retrieval routes" },
            { name: "Questions", description: "Question retrieval routes" },
            { name: "Grading", description: "Exam grading routes" },
        ],
    },
    apis: ["./server.js", "./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
