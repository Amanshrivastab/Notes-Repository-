import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useOneNote from "../hooks/useOneNote";
import useUpdateNote from "../hooks/useUpdateNote";

function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();

    // ========================================
    // FETCH EXISTING NOTE
    // ========================================

    const {
        note,
        loading: noteLoading,
        error: noteError,
    } = useOneNote(id);

    // ========================================
    // UPDATE NOTE
    // ========================================

    const {
        update,
        loading: updateLoading,
        error: updateError,
        success,
    } = useUpdateNote();

    // ========================================
    // FORM STATE
    // ========================================

    const [form, setForm] = useState({
        title: "",
        description: "",
        subject: "",
        semester: "",
        branch: "",
    });

    const [file, setFile] = useState(null);

    // ========================================
    // PUT EXISTING NOTE DATA INTO FORM
    // ========================================

    useEffect(() => {
        if (note) {
            setForm({
                title: note.title || "",
                description: note.description || "",
                subject: note.subject || "",
                semester: note.semester || "",
                branch: note.branch || "",
            });
        }
    }, [note]);

    // ========================================
    // HANDLE TEXT INPUT
    // ========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ========================================
    // HANDLE FILE
    // ========================================

    const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
        setFile(null);
        return;
    }

    const allowedMimeTypes = [
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

    if (!allowedMimeTypes.includes(selectedFile.type)) {
        alert("Only PDF, DOC, DOCX, PPT, and PPTX files are allowed.");
        e.target.value = "";
        setFile(null);
        return;
    }

    setFile(selectedFile);
};

    // ========================================
    // HANDLE FORM SUBMIT
    // ========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("subject", form.subject);
        formData.append("semester", form.semester);
        formData.append("branch", form.branch);

        // Only send file if admin selected a new PDF
        if (file) {
            formData.append("file", file);
        }

        try {
            await update(id, formData);

            // Go back to dashboard after successful update
            navigate("/dashboard");

        } catch (error) {
            console.error(
                "EDIT NOTE SUBMIT ERROR:",
                error
            );
        }
    };

    // ========================================
    // LOADING EXISTING NOTE
    // ========================================

    if (noteLoading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10">
                <p className="text-center text-gray-600">
                    Loading note...
                </p>
            </div>
        );
    }

    // ========================================
    // FETCH ERROR
    // ========================================

    if (noteError) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    {noteError}
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-4 bg-gray-200 px-4 py-2 rounded-lg"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">

            {/* ========================================
                HEADER
            ======================================== */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Edit Note
                </h1>

                <p className="text-gray-600 mt-1">
                    Update note information or replace the PDF
                </p>
            </div>

            {/* ========================================
                UPDATE ERROR
            ======================================== */}

            {updateError && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                    {updateError}
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
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* SEMESTER */}

                <div>
                    <label className="block font-medium mb-2">
                        Semester/class
                    </label>

                    <input
                        type="number"
                        name="semester"
                        value={form.semester}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* BRANCH */}

                <div>
                    <label className="block font-medium mb-2">
                        Branch/stream
                    </label>

                    <input
                        type="text"
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* PDF */}

                <div>
                    <label className="block font-medium mb-2">
                        Replace PDF
                    </label>

                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />

                    <p className="text-sm text-gray-500 mt-2">
                        Leave this empty if you want to keep the
                        existing PDF.
                    </p>

                    {file && (
                        <p className="text-sm text-green-600 mt-2">
                            New file: {file.name}
                        </p>
                    )}

                    {/* EXISTING FILE */}

                    {!file && note?.file?.originalName && (
                        <p className="text-sm text-gray-600 mt-2">
                            Current file:{" "}
                            {note.file.originalName}
                        </p>
                    )}
                </div>

                {/* BUTTONS */}

                <div className="flex gap-3 pt-4">

                    <button
                        type="submit"
                        disabled={updateLoading}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {updateLoading
                            ? "Updating..."
                            : "Update Note"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        disabled={updateLoading}
                        className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                </div>

            </form>
        </div>
    );
}

export default EditNote;