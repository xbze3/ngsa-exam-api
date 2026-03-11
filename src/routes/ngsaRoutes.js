const express = require("express");
const {
    getExams,
    gradeExam,
    getEnglishExams,
    getMathExams,
} = require("../controllers/examController");
const getExamQuestions = require("../controllers/questionController");

const router = express.Router();

router.get("/exams", getExams);

router.get("/exams/english", getEnglishExams);
router.get("/exams/math", getMathExams);

router.get("/exam/questions/:id", getExamQuestions);

router.post("/exam/:testId/grade", gradeExam);

module.exports = router;
