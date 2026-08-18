const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        semester: {
            type: Number,
            required: true,
        },

        branch: {
            type: String,
            required: true,
            trim: true,
        },

        // Google Drive file information
        file: {
            driveFileId: {
                type: String,
                required: true,
            },

            originalName: {
                type: String,
                required: true,
            },

            mimeType: {
                type: String,
                required: true,
            },

            size: {
                type: Number,
                required: true,
            },
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;