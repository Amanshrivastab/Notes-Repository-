
const { google } = require("googleapis");
const { Readable } = require("stream");

// ==================== CREATE OAUTH CLIENT ====================

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// ==================== ADD REFRESH TOKEN ====================

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// ==================== CREATE GOOGLE DRIVE CLIENT ====================

const drive = google.drive({
    version: "v3",
    auth: oauth2Client
});


// ==================== UPLOAD FILE ====================

const uploadFile = async (file) => {

    const response = await drive.files.create({
        requestBody: {
            name: file.originalname,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
        },

        media: {
            mimeType: file.mimetype,
            body: Readable.from(file.buffer)
        },

        fields: "id, name, mimeType, size, webViewLink"
    });

    return response.data;
};


// ==================== DELETE FILE ====================

const deleteFile = async (fileId) => {

    await drive.files.delete({
        fileId: fileId
    });

    return true;
};


module.exports = {
    drive,
    uploadFile,
    deleteFile
};

