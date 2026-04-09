const mongoose = require("mongoose");
const { Schema } = mongoose;

const examModel = new Schema(
    {
        subject_id: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        level: {
            type: String,
            required: true,
            trim: true,
        },
        paper_type: {
            type: String,
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
            min: 1900,
        },
        is_available: {
            type: Boolean,
            required: true,
        },
        time_limit: {
            type: Number,
            required: true,
        },
        question_count: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        versionKey: false,
        strict: false,
    },
);

module.exports = mongoose.model("ExamModel", examModel, "exams");
