const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        level: {
            type: String,
            required: true,
            trim: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        icon: {
            type: String,
            required: true,
        },

        color: {
            type: String,
            default: "gray",
        },

        category: {
            type: String,
            trim: true,
        },

        is_active: {
            type: Boolean,
            default: true,
        },

        is_available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        versionKey: false,
    },
);

subjectSchema.index({ level: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model("Subject", subjectSchema, "subjects");
