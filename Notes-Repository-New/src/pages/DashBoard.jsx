import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNotes } from "../utils/notesApi";
import useDeleteNote from "../hooks/useDeleteNote";
import StudentList from "../components/StudentList";

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    const {
        remove,
        loading: deleteLoading,
        error: deleteError,
        } = useDeleteNote();

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

     const handleDelete = async (id) => {
        try {
            setDeletingId(id);

            await remove(id);

            setNotes((prevNotes) =>
                prevNotes.filter(
                    (note) => note._id !== id
                )
            );

            setShowDeleteModal(false);
            setNoteToDelete(null);

            } catch (error) {
                console.error(
                    "DASHBOARD DELETE ERROR:",
                    error
            );
            } finally {
                setDeletingId(null);
            }
        };

        const cancelDelete = () => {
            setShowDeleteModal(false);
            setNoteToDelete(null);
        };

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
                                        Semester/class
                                    </th>

                                    <th className="text-left p-3">
                                        Branch/stream
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
                                                 onClick={() =>{
                                                     setNoteToDelete(note);
                                                     setShowDeleteModal(true);
                                                 }}
                                                disabled={deletingId === note._id}
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                 {deletingId === note._id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}

                <StudentList/>
                {showDeleteModal && (
                     <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4
                ">

                 <div className=" w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl
                    ">

                  {/* Modal heading */}
                 <h2 className=" text-xl font-bold text-gray-800 ">
                              Delete Note?
                 </h2>


            {/* Message */}
            <p className=" mt-3 text-gray-600 leading-relaxed ">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-800">
                    {noteToDelete?.title}
                </span>
                ?
            </p>


            <p className=" mt-2 text-sm text-red-500 ">
                This action cannot be undone.
            </p>


            {/* Buttons */}
            <div className=" mt-6 flex justify-end gap-3 ">

                {/* Cancel */}
                <button
                    onClick={cancelDelete}
                    disabled={deletingId !== null}
                    className=" px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium
                        hover:bg-gray-200 transition disabled:opacity-50 " >
                    Cancel
                </button>


                {/* Confirm Delete */}
                <button
                    onClick={() =>
                        handleDelete(noteToDelete._id)
                    }
                    disabled={deletingId !== null}
                    className="
                        px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700
                        transition disabled:bg-red-400 disabled:cursor-not-allowed " >
                    {deletingId !== null
                        ? "Deleting..."
                        : "Confirm Delete"}
                </button>

            </div>

        </div>

    </div>
)}

            </div>
        </>
    );
}

export default Dashboard;