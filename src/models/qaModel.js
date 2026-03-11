const mongoose = require("mongoose");
const { Schema } = mongoose;

const qaModel = new mongoose.Schema(
    {
        test_id: {
            type: Schema.Types.ObjectId,
            ref: "ExamModel",
            required: true,
            index: true,
        },
        number: {
            type: Number,
            required: true,
        },
        correct_option: {
            type: String,
            required: true,
            enum: ["A", "B", "C", "D"],
        },
        options: {
            A: { type: String, required: true, trim: true },
            B: { type: String, required: true, trim: true },
            C: { type: String, required: true, trim: true },
            D: { type: String, required: true, trim: true },
        },
        question_diagram: {
            type: String,
            default: "",
        },
        question_text: {
            type: String,
            required: true,
            trim: true,
        },
        context: {
            type: {
                type: String,
                default: "none",
            },
            content: {
                type: String,
                default: "",
            },
        },
        instruction: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        versionKey: false,
    },
);

module.exports = mongoose.model("QAModel", qaModel, "English-QA");
