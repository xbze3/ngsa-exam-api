const QAModel = require("../models/questionModel");

async function getExamQuestions(req, res) {
    try {
        const { testId } = req.params;

        const examQuestions = await QAModel.find({ test_id: id }).select(
            "-correct_option -test_id",
        );

        if (!examQuestions) {
            return res.status(404).json({ message: "Exam not found" });
        }

        res.json({
            questions: examQuestions,
        });
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`,
        });
    }
}

module.exports = getExamQuestions;
