const mongoose = require("mongoose");
const { Schema } = mongoose;

const examModel = new Schema(
    {
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
        question_ids: [
            {
                type: Schema.Types.ObjectId,
                ref: "QAModel",
                required: true,
            },
        ],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        versionKey: false,
    },
    {
        strict: false,
        versionKey: false,
    },
);

module.exports = mongoose.model("ExamModel", examModel, "English-Tests");
