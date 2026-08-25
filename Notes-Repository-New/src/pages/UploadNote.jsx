import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUploadNote from "../hooks/useUploadNote";


const UploadNote = ()=>{
    const navigate = useNavigate();

    const {
        upload,
        loading,
        error,
        success
    }= useUploadNote();

    const [form , setForm] = useState({
        title:"",
        description:"",
        subject:"",
        semster:"",
        branch:"",
    });

    const [file, setFile] = useState(null);

     // HANDLE INPUT
    // ========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //file input 
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            setFile(null);
            return;
        }

        const allowedTypes = [
            "application/pdf",

            // DOC
            "application/msword",

            // DOCX
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

            // PPT
            "application/vnd.ms-powerpoint",

            // PPTX
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            alert(
                "Only PDF, DOC, DOCX, PPT, and PPTX files are allowed."
            );

            e.target.value = "";
            setFile(null);

            return;
        }

        setFile(selectedFile);
    };

    // submit 
     const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append(
            "description",
            form.description
        );
        formData.append("subject", form.subject);
        formData.append("semester", form.semester);
        formData.append("branch", form.branch);

        // IMPORTANT:
        // Backend uses upload.single("file")
        formData.append("file", file);

        try {
            await upload(formData);

            // Go back to dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error(
                "UPLOAD NOTE SUBMIT ERROR:",
                error
            );
        }
    };



     return (
        <div className="max-w-3xl mx-auto px-4 py-8">

            {/* ========================================
                HEADER
            ======================================== */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Upload Note
                </h1>

                <p className="text-gray-600 mt-1">
                    Add a new note to the repository
                </p>
            </div>


            {/* ========================================
                ERROR
            ======================================== */}

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}


            {/* ========================================
                SUCCESS
            ======================================== */}

            {success && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                    {success}
                </div>
            )}


            {/* ========================================
                FORM
            ======================================== */}

            <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 rounded-xl p-6 space-y-5"
            >

                {/* TITLE */}

                <div>
                    <label className="block font-medium mb-2">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter note title"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                {/* DESCRIPTION */}

                <div>
                    <label className="block font-medium mb-2">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Enter note description"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                {/* SUBJECT */}

                <div>
                    <label className="block font-medium mb-2">
                        Subject
                    </label>

                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        placeholder="Example: DBMS"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                {/* SEMESTER */}

                <div>
                    <label className="block font-medium mb-2">
                        Semester(1-8)/class(9-12)
                    </label>

                    <input
                        type="Number"
                        name="semester"
                        value={form.semester}
                        onChange={handleChange}
                        required
                        min="1"
                        placeholder="Example: 4"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                {/* BRANCH */}

                <div>
                    <label className="block font-medium mb-2">
                        Branch/stream(for school)
                    </label>

                    <input
                        type="text"
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                        required
                        placeholder="Example: CSE"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                {/* FILE */}

                <div>
                    <label className="block font-medium mb-2">
                        Note File
                    </label>

                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={handleFileChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />

                    <p className="text-sm text-gray-500 mt-2">
                        Supported formats: PDF, DOC, DOCX,
                        PPT, PPTX
                    </p>

                    {file && (
                        <p className="text-sm text-green-600 mt-2">
                            Selected: {file.name}
                        </p>
                    )}
                </div>


                {/* BUTTONS */}

                <div className="flex gap-3 pt-4">

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading
                            ? "Uploading..."
                            : "Upload Note"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        disabled={loading}
                        className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                </div>

            </form>
        </div>
    );


};
export default UploadNote;