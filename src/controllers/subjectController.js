const mongoose = require("mongoose");
const ExamModel = require("../models/examModel");

async function getSubjects(req, res) {
    try {
        const subjects = await ExamModel.aggregate([
            {
                $match: {
                    subject_id: { $ne: null },
                },
            },
            {
                $group: {
                    _id: "$subject_id",
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "_id",
                    foreignField: "_id",
                    as: "subject_doc",
                },
            },
            {
                $unwind: "$subject_doc",
            },
            {
                $project: {
                    _id: 0,
                    subject: "$subject_doc.subject",
                    count: 1,
                    description: "$subject_doc.description",
                    icon: "$subject_doc.icon",
                    color: "$subject_doc.color",
                    is_available: "$subject_doc.is_available",
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
