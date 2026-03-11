const ExamModel = require("../models/examModel");
const QAModel = require("../models/qaModel");

async function getEnglishExams(req, res) {
    try {
        const exams = await ExamModel.find().sort({ year: -1 });
        res.json({
            exams: exams,
        });
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`,
        });
    }
}

async function gradeExam(req, res) {
    try {
        const { testId } = req.params;
        const { answers } = req.body;

        if (!mongoose.Types.ObjectId.isValid(testId)) {
            return res.status(400).json({ message: "Invalid test ID" });
        }

        if (!Array.isArray(answers)) {
            return res
                .status(400)
                .json({ message: "Answers must be an array" });
        }

        const test = await ExamModel.findById(testId).lean();

        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        const questions = await QAModel.find({ test_id: testId })
            .select(
                "_id number question_text options correct_option instruction",
            )
            .sort({ number: 1 })
            .lean();

        if (!questions.length) {
            return res
                .status(404)
                .json({ message: "No questions found for this test" });
        }

        const submittedAnswersMap = new Map();

        for (const answer of answers) {
            if (answer.questionId && answer.selectedOption) {
                submittedAnswersMap.set(
                    String(answer.questionId),
                    answer.selectedOption,
                );
            }
        }

        let score = 0;
        const results = [];

        for (const question of questions) {
            const submitted =
                submittedAnswersMap.get(String(question._id)) || null;
            const isCorrect = submitted === question.correct_option;

            if (isCorrect) {
                score += 1;
            }

            results.push({
                questionId: question._id,
                number: question.number,
                question_text: question.question_text,
                selectedOption: submitted,
                correctOption: question.correct_option,
                isCorrect,
            });
        }

        const totalQuestions = questions.length;
        const incorrect = totalQuestions - score;
        const unanswered = results.filter(
            (r) => r.selectedOption === null,
        ).length;
        const percentage = Number(((score / totalQuestions) * 100).toFixed(2));

        res.json({
            test: {
                id: test._id,
                subject: test.subject,
                level: test.level,
                paper_type: test.paper_type,
                year: test.year,
            },
            summary: {
                score,
                totalQuestions,
                incorrect,
                unanswered,
                percentage,
            },
            results,
        });
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`,
        });
    }
}

module.exports = { getEnglishExams, gradeExam };
