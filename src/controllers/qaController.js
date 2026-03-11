const QAModel = require("../models/qaModel");

async function getExamQuestions(req, res) {
    try {
        const { id } = req.params;

        const examQuestions = await QAModel.find({ test_id: id }).select(
            "-correct_option -test_id",
        );
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
