import { Link, useParams } from "react-router-dom";
import useOneNote from "../hooks/useOneNote";
import useNoteFile from "../hooks/useNoteFile";

function NotesDetails() {

    const { id } = useParams();

    // Get note details
    const {
        note,
        loading,
        error
    } = useOneNote(id);

    // Handle view/download
    const {
        handleView,
        handleDownload,
        viewLoading,
        downloadLoading,
        error: fileError
    } = useNoteFile(
        id,
        note?.file?.originalName
    );


    // -------------------------
    // Loading note
    // -------------------------

    if (loading) {
        return (
            <main className="max-w-4xl mx-auto px-5 py-10">

                <p className="text-gray-600">
                    Loading note...
                </p>

            </main>
        );
    }


    // -------------------------
    // Note API error
    // -------------------------

    if (error) {
        return (
            <main className="max-w-4xl mx-auto px-5 py-10">

                <h1 className="text-2xl font-bold text-red-500">
                    {error}
                </h1>

                <Link
                    to="/notes"
                    className="text-blue-600 hover:underline mt-4 inline-block"
                >
                    ← Back to Notes
                </Link>

            </main>
        );
    }


    // -------------------------
    // Note not found
    // -------------------------

    if (!note) {
        return (
            <main className="max-w-4xl mx-auto px-5 py-10">

                <h1 className="text-2xl font-bold text-gray-700">
                    Note not found
                </h1>

                <Link
                    to="/notes"
                    className="text-blue-600 hover:underline mt-4 inline-block"
                >
                    ← Back to Notes
                </Link>

            </main>
        );
    }


    // -------------------------
    // Main page
    // -------------------------

    return (
        <main className="max-w-4xl mx-auto px-5 py-8">

            {/* Back button */}

            <Link
                to="/notes"
                className="text-blue-600 hover:underline"
            >
                ← Back to Notes
            </Link>


            {/* Note Card */}

            <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">

                {/* Title */}

                <h1 className="text-3xl font-bold text-gray-800">
                    📄 {note.title}
                </h1>


                {/* Note information */}

                <div className="mt-6 space-y-5">


                    {/* Subject */}

                    <div>

                        <h2 className="text-sm font-semibold text-gray-500">
                            Subject
                        </h2>

                        <p className="text-lg text-gray-700">
                            {note.subject}
                        </p>

                    </div>


                    {/* Semester */}

                    <div>

                        <h2 className="text-sm font-semibold text-gray-500">
                            Semester/Class
                        </h2>

                        <p className="text-lg text-gray-700">
                            {note.semester}
                        </p>

                    </div>


                    {/* Branch */}

                    <div>

                        <h2 className="text-sm font-semibold text-gray-500">
                            Branch
                        </h2>

                        <p className="text-lg text-gray-700">
                            {note.branch}
                        </p>

                    </div>


                    {/* Description */}

                    <div>

                        <h2 className="text-sm font-semibold text-gray-500">
                            Description
                        </h2>

                        <p className="text-gray-700 leading-7">
                            {note.description}
                        </p>

                    </div>


                    {/* File information */}

                    {note.file && (
                        <div>

                            <h2 className="text-sm font-semibold text-gray-500">
                                File
                            </h2>

                            <p className="text-gray-700">
                                {note.file.originalName}
                            </p>

                            <p className="text-sm text-gray-500">
                                {note.file.mimeType}
                            </p>

                        </div>
                    )}

                </div>


                {/* File error */}

                {fileError && (
                    <p className="text-red-500 mt-5">
                        {fileError}
                    </p>
                )}


                <div className="mt-6 flex gap-3">

                     <button
                         onClick={handleView}
                         disabled={viewLoading || downloadLoading}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                         {viewLoading ? "Opening..." : "View PDF"}
                    </button>


                <button
                      onClick={handleDownload}
                     disabled={viewLoading || downloadLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                     {downloadLoading ? "Downloading..." : "Download"}
                    </button>

                </div>

            </div>

        </main>
    );
}

export default NotesDetails;