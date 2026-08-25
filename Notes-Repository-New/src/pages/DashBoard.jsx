import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNotes } from "../utils/notesApi";

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNotes = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await fetchNotes();

                setNotes(data);
            } catch (err) {
                console.error(err);
                setError(
                    err.message || "Failed to load notes"
                );
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, []);

    return (
        <>
            

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Admin Dashboard
                        </h1>

                        <p className="text-gray-600 mt-1">
                            Manage your notes
                        </p>
                    </div>

                    <Link
                        to="/dashboard/upload"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Upload Note
                    </Link>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-10">
                        <p>Loading notes...</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {/* No notes */}
                {!loading && !error && notes.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">
                            No notes found.
                        </p>
                    </div>
                )}

                {/* Notes */}
                {!loading && !error && notes.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded-lg">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-3">
                                        Title
                                    </th>

                                    <th className="text-left p-3">
                                        Subject
                                    </th>

                                    <th className="text-left p-3">
                                        Semester
                                    </th>

                                    <th className="text-left p-3">
                                        Branch
                                    </th>

                                    <th className="text-left p-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {notes.map((note) => (
                                    <tr
                                        key={note._id}
                                        className="border-t"
                                    >
                                        <td className="p-3">
                                            {note.title}
                                        </td>

                                        <td className="p-3">
                                            {note.subject}
                                        </td>

                                        <td className="p-3">
                                            {note.semester}
                                        </td>

                                        <td className="p-3">
                                            {note.branch}
                                        </td>

                                        <td className="p-3 flex gap-2">

                                            <Link
                                                to={`/dashboard/edit/${note._id}`}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}

            </div>
        </>
    );
}

export default Dashboard;