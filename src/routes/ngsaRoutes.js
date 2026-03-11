const express = require("express");
const { getEnglishExams, gradeExam } = require("../controllers/examController");
const getExamQuestions = require("../controllers/qaController");

const router = express.Router();

router.get("/english", getEnglishExams);
router.get("/english/questions/:id", getExamQuestions);
router.post("/english/:testId/grade", gradeExam);

module.exports = router;
