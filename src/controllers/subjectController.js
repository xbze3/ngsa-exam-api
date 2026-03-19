const ExamModel = require("../models/examModel");

async function getSubjects(req, res) {
    try {
        const subjects = await ExamModel.aggregate([
            {
                $group: {
                    _id: "$subject",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    subject: "$_id",
                    count: 1,
                },
            },
            {
                $sort: { subject: 1 },
            },
        ]);

        res.json({
            level: "NGSA",
            subjects,
        });
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`,
        });
    }
}

module.exports = { getSubjects };
