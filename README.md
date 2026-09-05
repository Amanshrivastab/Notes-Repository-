# 📚 Notes Repository

A full-stack web application where students can **view, search, and download educational notes**, while administrators can securely **upload, edit, and delete notes**.

The project is built using **React, Node.js, Express.js, MongoDB, and Google Drive API**.

---

## 🌐 Live Demo

🚀 **Notes Repository is successfully deployed and available online.**

Users can visit and use the live website directly without downloading or running the project locally.

### 👉 [Visit Notes Repository](https://notes-repository-xi.vercel.app)

**Live Website:** https://notes-repository-xi.vercel.app

The frontend is deployed using **Vercel**, allowing users to access the website directly through their browser.

> **Deployed Website:** This means the application is hosted online and publicly accessible through the link above.

---

## 🚀 Features

### 👨‍🎓 Student Features

* 📖 View all available notes
* 🔍 Search notes by title
* 🎯 Filter notes by:

  * Subject
  * Semester
  * Branch
* 📄 View note details
* ⬇️ Download notes
* 🆕 View latest uploaded notes
* 👤 User registration and login

### 👨‍💼 Admin Features

* 🔐 Secure admin authentication
* 📤 Upload notes in PDF format
* ✏️ Edit existing notes
* 🗑️ Delete notes
* 👥 Manage registered students/users
* 🔒 Admin-only protected routes

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

### File Storage

* Google Drive API
* Google OAuth 2.0

---

## 🏗️ Project Architecture

```text
Notes Repository
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── context
│   │   ├── utils
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── utils
│   │
│   └── package.json
│
└── README.md
```

---

# 🔄 Application Flow

```text
User
  │
  ▼
React Frontend (Vercel)
  │
  ▼
Express.js API
  │
  ├── MongoDB Atlas
  │      │
  │      └── Stores Users and Notes Metadata
  │
  └── Google Drive
         │
         └── Stores PDF Files
```

---

# 🔐 Authentication

The application uses **JWT (JSON Web Tokens)** for authentication.

### Authentication Flow

```text
User Login
    │
    ▼
Verify Email & Password
    │
    ▼
Generate JWT Token
    │
    ▼
Store Token in Local Storage
    │
    ▼
Send Token with Protected API Requests
```

---

# 👥 User Roles

The application supports two roles:

| Role  | Permissions                    |
| ----- | ------------------------------ |
| User  | View and download notes        |
| Admin | Upload, edit, and delete notes |

Admin routes are protected using middleware.

---

# 📄 Note Information

Each note contains:

* Title
* Description
* Subject
* Semester
* Branch
* PDF file information
* Upload date
* Uploaded by

---

# 🔌 API Endpoints

## Authentication APIs

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

---

## Notes APIs

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| GET    | `/api/notes`          | Get all notes             |
| GET    | `/api/notes/latest`   | Get latest notes          |
| GET    | `/api/notes/:id`      | Get a single note         |
| GET    | `/api/notes/:id/file` | Download/stream note file |
| POST   | `/api/notes`          | Upload a new note         |
| PUT    | `/api/notes/:id`      | Update a note             |
| DELETE | `/api/notes/:id`      | Delete a note             |

> POST, PUT, and DELETE operations require Admin authorization.

---

## Student APIs

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/api/student`              | Get all students     |
| GET    | `/api/student/email/:email` | Get student by email |
| DELETE | `/api/student/:id`          | Delete a student     |

---

# 📦 Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Amanshrivastab/Notes-Repository-.git
```

Navigate to the project folder:

```bash
cd Notes-Repository
```

---

# 💻 Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

# 🖥️ Backend Setup

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GOOGLE_REDIRECT_URI=your_google_redirect_uri

GOOGLE_REFRESH_TOKEN=your_google_refresh_token

GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

# 🗄️ Database

The application uses **MongoDB Atlas**.

MongoDB stores:

* User information
* Authentication details
* User roles
* Note metadata
* Google Drive file information

PDF files are stored separately in **Google Drive**.

---

# ☁️ Google Drive Integration

The application uses the **Google Drive API** to store PDF files.

### Upload Process

```text
Admin Uploads PDF
        │
        ▼
Express Server
        │
        ▼
Google Drive API
        │
        ▼
PDF Stored in Google Drive
        │
        ▼
File Metadata Saved in MongoDB
```

The application uses **OAuth 2.0 authentication** with a refresh token to access Google Drive.

---

# 🔒 Security Features

* Password hashing using bcrypt
* JWT authentication
* Protected API routes
* Admin authorization middleware
* Environment variables for sensitive credentials
* Google Drive file IDs are protected
* Secure file streaming through the backend

---

# 🌐 Deployment

The project is deployed using the following services:

### Frontend

* **Vercel**
* Live Website: https://notes-repository-xi.vercel.app

### Backend

* **Render**

### Database

* **MongoDB Atlas**

### File Storage

* **Google Drive**

---

# 🔑 Environment Variables

## Backend

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GOOGLE_REDIRECT_URI=

GOOGLE_REFRESH_TOKEN=

GOOGLE_DRIVE_FOLDER_ID=
```

## Frontend

```env
VITE_API_URL=
```

---

# 🧪 Testing

You can test the backend APIs using:

* Postman
* Thunder Client
* Browser API testing tools

Tested functionalities include:

* User registration
* User login
* JWT authentication
* Note upload
* Note update
* Note deletion
* Note retrieval
* PDF download
* Google Drive integration

---

# 📸 Screenshots

You can add screenshots of your application here.

Suggested screenshots:

* 🏠 Home Page
* 📚 Notes Page
* 🔍 Search and Filter
* 🔐 Login Page
* 👨‍💼 Admin Dashboard
* 📤 Upload Note Page

Example:

```markdown
![Home Page](./screenshots/home.png)
```

---

# 🔮 Future Improvements

* ⭐ Add note ratings
* 💬 Add comments
* ❤️ Add favorite notes
* 📊 Admin analytics dashboard
* 📱 Improve mobile responsiveness
* 🔔 Email notifications
* 🔎 Advanced search
* 📂 Category-wise notes
* 👨‍🎓 Student profile
* 📈 Download statistics

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add new feature"
```

5. Push to GitHub

```bash
git push origin feature-name
```

6. Create a Pull Request

---

# 👨‍💻 Author

**Aman Shrivastav**

B.Tech Computer Science Engineering Student

Aspiring Full Stack Developer

---

# 📜 License

This project is created for educational purposes.

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub!

---

## 🙏 Thank You

Thank you for visiting the **Notes Repository** project!
