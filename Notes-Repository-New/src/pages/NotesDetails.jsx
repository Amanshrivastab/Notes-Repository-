
import { Link, useParams } from "react-router-dom";
import useOneNote from "../hooks/useOneNote";

function NotesDetails() {
    const { id } = useParams();

    const {
        note,
        loading,
        error
    } = useOneNote(id);

    if (loading) {
        return (
            <>
               

                <div className="max-w-4xl mx-auto px-5 py-10">
                    <p className="text-gray-600">
                        Loading note...
                    </p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                

                <div className="max-w-4xl mx-auto px-5 py-10">
                    <h1 className="text-2xl font-bold text-red-500">
                        {error}
                    </h1>

                    <Link
                        to="/notes"
                        className="text-blue-600 hover:underline mt-4 inline-block"
                    >
                        ← Back to Notes
                    </Link>
                </div>
            </>
        );
    }

    if (!note) {
        return (
            <>
                

                <div className="max-w-4xl mx-auto px-5 py-10">
                    <h1 className="text-2xl font-bold text-gray-700">
                        Note not found
                    </h1>

                    <Link
                        to="/notes"
                        className="text-blue-600 hover:underline mt-4 inline-block"
                    >
                        ← Back to Notes
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            

            <main className="max-w-4xl mx-auto px-5 py-8">

                <Link
                    to="/notes"
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Notes
                </Link>

                <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        📄 {note.title}
                    </h1>

                    <div className="mt-6 space-y-5">

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Subject
                            </h2>

                            <p className="text-lg text-gray-700">
                                {note.subject}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Semester/Class
                            </h2>

                            <p className="text-lg text-gray-700">
                                {note.semester}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Branch
                            </h2>

                            <p className="text-lg text-gray-700">
                                {note.branch}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Description
                            </h2>

                            <p className="text-gray-700 leading-7">
                                {note.description}
                            </p>
                        </div>

                    </div>

                    <div className="mt-8 flex gap-3">

                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Download
                        </button>

                    </div>

                </div>

            </main>
        </>
    );
}

export default NotesDetails;