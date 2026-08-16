const { google } = require("googleapis");
const path = require("path");
const { Readable } = require("stream");

async function test() {
    try {
        console.log("Step 1: Reading credentials...");
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, "../credentials/google-service-account.json"),
            scopes: ["https://www.googleapis.com/auth/drive"],
        });

        const drive = google.drive({ version: "v3", auth: auth });

        console.log("Step 2: Uploading a small test file...");

        const dummyContent = "Hello, this is a test file.";
        const dummyBuffer = Buffer.from(dummyContent, "utf-8");

        const response = await drive.files.create({
            requestBody: {
                name: "test-upload.txt",
                parents: ["1HGHtC0dgcphMCo6MKm5VIRVanJIAEqrt"],
            },
            media: {
                mimeType: "text/plain",
                body: Readable.from(dummyBuffer),
            },
            fields: "id, name, mimeType",
        });

        console.log("✅ Upload successful!");
        console.log(response.data);

    } catch (error) {
        console.error("❌ Failed:", error.message);
        console.error(error);
    }
}

test();
