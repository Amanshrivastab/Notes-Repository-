// testDrive.js
// Temporary standalone script — sirf yeh check karta hai ki
// service account se Google Drive connect ho raha hai ya nahi.
// Isse abhi CRUD API se koi lena dena nahi.

const { google } = require("googleapis");
const path = require("path");

async function testConnection() {
  try {
    // 1. Authenticate using service account JSON key
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "credentials", "google-service-account.json"),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const authClient = await auth.getClient();
    const drive = google.drive({ version: "v3", auth: authClient });

    console.log("✅ Authentication successful. Ab Drive se files list kar rahe hain...\n");

    // 2. List files that this service account can see
    // (Isme wahi files/folders aayenge jo iss service account
    //  ke saath share kiye gaye hain — jaise tera "Notes Repository" folder)
    const res = await drive.files.list({
      pageSize: 20,
      fields: "files(id, name, mimeType)",
    });

    const files = res.data.files;

    if (files.length === 0) {
      console.log("⚠️ Koi file/folder nahi mila. Check kar ki Drive folder");
      console.log("   service account email ke saath share hua hai ya nahi.");
    } else {
      console.log("📂 Service account ko yeh files/folders dikh rahe hain:\n");
      files.forEach((file) => {
        console.log(`- ${file.name}  (id: ${file.id})  [${file.mimeType}]`);
      });
    }
  } catch (err) {
    console.error("❌ Connection fail ho gaya. Error:");
    console.error(err.message);
  }
}

testConnection();