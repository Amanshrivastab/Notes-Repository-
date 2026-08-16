{/*const{google} = require("googleapis");
const path = require("path");
//autjeticate with google drive 

const auth = new google.auth.GoogleAuth({
        keyFile:path.join(
            __dirname,
            "../credentials/google-service-account.json"
        ),
        scopes: ["https://www.googleapis.com/auth/drive"],
    }
);

//create google drive client 
const drive = google.drive({
    version: "v3",
    auth: auth,
});

// upload file to  google drive 
async function uploadFile(file){
    try{

        const response = await drive.files.create({

            requestBody:{
                name: file.originalname,

                parents: [
                    "1HGHtC0dgcphMCo6MKm5VIRVanJIAEqrt"
                ],
            },

            media:{
                mimeType:file.mimetype,
                body:require("stream").Readable.from(file.buffer)
            },
            fields:"id , name ,mimeType"
        });
        console.log("✅ File uploaded to Google Drive");

        console.log(response.data);


        return response.data;

    }catch(error){
        console.error(
            "❌ Google Drive upload failed:",
            error.message
        );

        throw error;
    }
}

module.exports = {
    uploadFile
};8*/}


const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const credentialsPath = path.join(
    __dirname,
    "../credentials",
    "OAuth-service-account.json"
);

// Read OAuth credentials
const credentials = JSON.parse(
    fs.readFileSync(credentialsPath, "utf-8")
);

const {
    client_id,
    client_secret,
    redirect_uris
} = credentials.web;

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);

// Add refresh token
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// Create Google Drive client
const drive = google.drive({
    version: "v3",
    auth: oauth2Client
});


// Upload file to Google Drive
const uploadFile = async (file) => {

    const response = await drive.files.create({
        requestBody: {
            name: file.originalname,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
        },

        media: {
            mimeType: file.mimetype,
            body: require("stream").Readable.from(file.buffer)
        },

        fields: "id, name, mimeType, size, webViewLink"
    });

    return response.data;
};


module.exports = {
    drive,
    uploadFile
};