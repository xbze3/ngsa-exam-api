const express = require("express");
const {
    getExams,
    gradeExam,
    getEnglishExams,
    getMathExams,
} = require("../controllers/examController");
const getExamQuestions = require("../controllers/questionController");

const router = express.Router();

/**
 * @openapi
 * /ngsa/exams:
 *   get:
 *     summary: Get all available exams
 *     description: Returns all exams in the database.
 *     tags: [Exams]
 *     responses:
 *       200:
 *         description: Successfully returned all exams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66d0d0000000000000000024
 *                       subject:
 *                         type: string
 *                         example: English
 *                       level:
 *                         type: string
 *                         example: NGSA
 *                       paper_type:
 *                         type: string
 *                         example: Paper 1
 *                       year:
 *                         type: integer
 *                         example: 2024
 *                       question_ids:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - 66d0d0240000000000000001
 *                           - 66d0d0240000000000000002
 *                           - 66d0d0240000000000000003
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-06-28T00:00:00.000Z
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-06-28T00:00:00.000Z
 */
router.get("/exams", getExams);

/**
 * @openapi
 * /ngsa/exams/english:
 *   get:
 *     summary: Get all English exams
 *     description: Returns all English exam papers.
 *     tags: [Exams]
 *     responses:
 *       200:
 *         description: Successfully returned all English exams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66d0d0000000000000000024
 *                       subject:
 *                         type: string
 *                         example: English
 *                       level:
 *                         type: string
 *                         example: NGSA
 *                       paper_type:
 *                         type: string
 *                         example: Paper 1
 *                       year:
 *                         type: integer
 *                         example: 2024
 *                       question_ids:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - 66d0d0240000000000000001
 *                           - 66d0d0240000000000000002
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-06-28T00:00:00.000Z
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-06-28T00:00:00.000Z
 */
router.get("/exams/english", getEnglishExams);

/**
 * @openapi
 * /ngsa/exams/math:
 *   get:
 *     summary: Get all Mathematics exams
 *     description: Returns all Mathematics exam papers.
 *     tags: [Exams]
 *     responses:
 *       200:
 *         description: Successfully returned all Mathematics exams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66d0d0000000000000000024
 *                       subject:
 *                         type: string
 *                         example: Mathematics
 *                       level:
 *                         type: string
 *                         example: NGSA
 *                       paper_type:
 *                         type: string
 *                         example: Paper 1
 *                       year:
 *                         type: integer
 *                         example: 2024
 *                       question_ids:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - 66d0d0240000000000000001
 *                           - 66d0d0240000000000000002
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-06-28T00:00:00.000Z
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-06-28T00:00:00.000Z
 */
router.get("/exams/math", getMathExams);

/**
 * @openapi
 * /ngsa/exam/questions/{testId}:
 *   get:
 *     summary: Get all questions for a specific exam
 *     description: Returns all questions for the selected exam. Correct answers are not included.
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         description: The exam ID
 *         schema:
 *           type: string
 *           example: 66d0d0000000000000000024
 *     responses:
 *       200:
 *         description: Successfully returned all questions for the exam
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       options:
 *                         type: object
 *                         properties:
 *                           A:
 *                             type: string
 *                             example: Option A
 *                           B:
 *                             type: string
 *                             example: Option B
 *                           C:
 *                             type: string
 *                             example: Option C
 *                           D:
 *                             type: string
 *                             example: Option D
 *                       context:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: none
 *                           content:
 *                             type: string
 *                             example: ""
 *                       _id:
 *                         type: string
 *                         example: 66da01000000000000000001
 *                       number:
 *                         type: integer
 *                         example: 1
 *                       instruction:
 *                         type: string
 *                         example: Choose the correct answer.
 *                       question_text:
 *                         type: string
 *                         example: Calvin is an _____ young man whom I admire.
 *                       question_diagram:
 *                         type: string
 *                         example: ""
 *       404:
 *         description: Exam not found
 */
router.get("/exam/questions/:testId", getExamQuestions);

/**
 * @openapi
 * /ngsa/exam/{testId}/grade:
 *   post:
 *     summary: Grade a submitted exam
 *     description: Submits selected answers for an exam and returns the grading results.
 *     tags: [Grading]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         description: The exam ID
 *         schema:
 *           type: string
 *           example: 66d0d0000000000000000000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       example: 66d0d0240000000000000001
 *                     selectedOption:
 *                       type: string
 *                       example: D
 *             example:
 *               answers:
 *                 - questionId: 66d0d0240000000000000001
 *                   selectedOption: D
 *                 - questionId: 66d0d0240000000000000002
 *                   selectedOption: C
 *     responses:
 *       200:
 *         description: Successfully graded the exam
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: object
 *                   properties:
 *                     score:
 *                       type: integer
 *                       example: 2
 *                     totalQuestions:
 *                       type: integer
 *                       example: 2
 *                     percentage:
 *                       type: number
 *                       example: 100
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       questionId:
 *                         type: string
 *                         example: 66d0d0240000000000000001
 *                       selectedOption:
 *                         type: string
 *                         example: D
 *                       isCorrect:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Exam not found
 */
router.post("/exam/:testId/grade", gradeExam);

module.exports = router;
