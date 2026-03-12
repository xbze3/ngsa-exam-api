# NGSA Exam API

A lightweight REST API for serving and grading NGSA (National Grade Six Assessment) exam questions. This API provides endpoints for retrieving exam papers, fetching exam questions, and grading submitted answers.

The project is built with:

- Node.js
- Express
- MongoDB
- Docker & Docker Compose

The database includes open-source NGSA-style exam questions and answers.

---

## Live Service

The API is publicly deployed and accessible at:

**Base URL:** [ https://ngsa-exam-api.onrender.com/ ]\
**API Documentation (Swagger):** [ https://ngsa-exam-api.onrender.com/docs ]

This live deployment allows developers, applications, and dashboards to access NGSA exam questions and grading services programmatically without needing to install the API locally.

---

## Features

- Retrieve available exams
- Filter exams by subject
- Retrieve all questions for a specific exam
- Submit answers and receive grading results
- Fully containerized with Docker
- Seeded database with exam data

---

## Project Structure

```
ngsa-api
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── examController.js
│   │   └── questionController.js
│   ├── models
│   │   ├── examModel.js
│   │   └── questionModel.js
│   └── routes
│       └── ngsaRoutes.js
├── data
│   ├── ngsa-db.exams.json
│   └── ngsa-db.questions.json
├── mongo-init
│   └── init.sh
├── docker-compose.yml
├── Dockerfile
├── server.js
├── package.json
└── README.md
```

---

## Running the Project

### Using Docker (Recommended)

Start the API and MongoDB using Docker Compose.

```bash
docker compose up --build
```

The API will be available at: `http://localhost:8080`

## Reset the Database

To reset the database and re-import the seed data:

```bash
docker compose down -v
docker compose up --build
```

---

## API Endpoints

**Base route:** `/ngsa`

| Method | Endpoint                   | Description                                                                                             |
| ------ | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| GET    | `/ngsa/exams`              | Returns a list of available exams.                                                                      |
| GET    | `/ngsa/exams/english`      | Returns all English exam papers.                                                                        |
| GET    | `/ngsa/exams/math`         | Returns all Mathematics exam papers.                                                                    |
| GET    | `/ngsa/exam/questions/:id` | Returns the list of questions for the selected exam. Correct answers are NOT included in this response. |
| POST   | `/ngsa/exam/:testId/grade` | Submit answers for grading.                                                                             |

---

### Get All Exams

**Example response:**

```json
[
    {
        "_id": "66d0d0000000000000000000",
        "subject": "English",
        "paper_type": "Paper 1",
        "year": 2010
    }
]
```

---

### Get Questions for an Exam

**Example:** `GET /ngsa/exam/questions/66d0d0000000000000000000`

**Example response:**

```json
{
    "questions": [
        {
            "_id": "66d0d0240000000000000001",
            "number": 1,
            "question_text": "Calvin is an _____ young man whom I admire.",
            "options": {
                "A": "adventorus",
                "B": "adventureus",
                "C": "adventorous",
                "D": "adventurous"
            }
        }
    ]
}
```

---

### Grade an Exam

**Example:** `POST /ngsa/exam/66d0d0000000000000000000/grade`

**Request Body:**

```json
{
    "answers": [
        {
            "questionId": "66d0d0240000000000000001",
            "selectedOption": "D"
        },
        {
            "questionId": "66d0d0240000000000000002",
            "selectedOption": "C"
        }
    ]
}
```

**Response Example:**

```json
{
    "summary": {
        "score": 2,
        "totalQuestions": 2,
        "percentage": 100
    },
    "results": [
        {
            "questionId": "66d0d0240000000000000001",
            "selectedOption": "D",
            "isCorrect": true
        },
        {
            "questionId": "66d0d0240000000000000002",
            "selectedOption": "C",
            "isCorrect": true
        }
    ]
}
```

---

## Database

The MongoDB database used by the project is: `ngsa-db`

**Collections:**

- exams
- questions

The database is automatically seeded from:

- `data/ngsa-db.exams.json`
- `data/ngsa-db.questions.json`

when the Mongo container initializes.

---

## Environment Variables

Example `.env` file for local development :

```
PORT=YOUR_PORT
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
```

---

## Health Check

**GET** `/healthcheck`

**Response:**

```json
{
    "status": "ok",
    "message": "API is up and running!"
}
```

---

## License

This project is licensed under the **MIT License**
