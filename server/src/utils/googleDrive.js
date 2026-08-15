const{google} = require("googleapis");
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
};