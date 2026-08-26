import { useEffect, useState } from "react";

import {
    fetchStudents,
    fetchStudentByEmail,
    deleteStudent
} from "../utils/studentApi";


function StudentList() {

    const [students, setStudents] = useState([]);
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // Load all students
    useEffect(() => {

        const loadStudents = async () => {

            try {
                setError("");

                const data = await fetchStudents();

                setStudents(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        loadStudents();

    }, []);


    // Search student by email
    const handleSearch = async (e) => {

        e.preventDefault();

        if (!email.trim()) {
            return;
        }

        try {

            setSearching(true);
            setError("");
            setMessage("");

            const student = await fetchStudentByEmail(email);

            setStudents([student]);

        } catch (error) {

            setStudents([]);
            setError(error.message);

        } finally {

            setSearching(false);

        }
    };


    // Show all students
    const handleShowAll = async () => {

        try {

            setLoading(true);
            setError("");
            setMessage("");
            setEmail("");

            const data = await fetchStudents();

            setStudents(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    // Delete student
const confirmDelete = async () => {

    if (!studentToDelete) {
        return;
    }

    try {

        setDeleting(true);
        setError("");
        setMessage("");

        await deleteStudent(studentToDelete._id);

        setStudents((previousStudents) =>
            previousStudents.filter(
                (student) =>
                    student._id !== studentToDelete._id
            )
        );

        setMessage("Student deleted successfully");

        setShowDeleteModal(false);
        setStudentToDelete(null);

    } catch (error) {

        setError(error.message);

    } finally {

        setDeleting(false);

    }
};


const cancelDelete = () => {

    setShowDeleteModal(false);
    setStudentToDelete(null);

};


    // Loading
    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <p className="text-gray-600 text-lg">
                    Loading students...
                </p>
            </div>
        );
    }


    return (
        <section className="mt-8">

            {/* Header */}
            <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-800">
                    Registered Students
                </h2>

                <p className="text-gray-500 mt-1">
                    Manage all registered students
                </p>

            </div>


            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">

                <form
                    onSubmit={handleSearch}
                    className="flex flex-col md:flex-row gap-3"
                >

                    <input
                        type="email"
                        placeholder="Search student by email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            flex-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2
                            focus:ring-blue-500 focus:border-blue-500 transition
                        "
                    />

                    <button
                        type="submit"
                        disabled={searching}
                        className="
                            px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg
                            hover:bg-blue-700 disabled:bg-blue-400 transition
                        "
                    >
                        {searching ? "Searching..." : "Search"}
                    </button>

                    <button
                        type="button"
                        onClick={handleShowAll}
                        className="
                            px-6
                            py-2.5
                            bg-gray-100
                            text-gray-700
                            font-medium
                            rounded-lg
                            hover:bg-gray-200
                            transition
                        "
                    >
                        Show All
                    </button>

                </form>

            </div>


            {/* Error */}
            {error && (
                <div className="mb-5 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
                    {error}
                </div>
            )}


            {/* Success message */}
            {message && (
                <div className="mb-5 p-4 rounded-lg bg-green-50 border border-green-200 text-green-600">
                    {message}
                </div>
            )}


            {/* Student Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                {students.length === 0 ? (

                    <div className="py-12 text-center">

                        <p className="text-gray-500 text-lg">
                            No students found.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="bg-gray-50 border-b border-gray-200">

                                <tr>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Name
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Role
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-gray-100">

                                {students.map((student) => (

                                    <tr
                                        key={student._id}
                                        className="hover:bg-gray-50 transition"
                                    >

                                        <td className="px-6 py-4">

                                            <p className="font-medium text-gray-800">
                                                {student.name}
                                            </p>

                                        </td>


                                        <td className="px-6 py-4 text-gray-600">
                                            {student.email}
                                        </td>


                                        <td className="px-6 py-4">

                                            <span className="
                                                inline-flex
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-medium
                                                bg-blue-50
                                                text-blue-600
                                            ">
                                                {student.role}
                                            </span>

                                        </td>


                                        <td className="px-6 py-4 text-right">

                                            <button
                                                onClick={()=>{
                                                    setStudentToDelete(student);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="
                                                    px-4
                                                    py-2
                                                    bg-red-50
                                                    text-red-600
                                                    rounded-lg
                                                    text-sm
                                                    font-medium
                                                    hover:bg-red-100
                                                    transition
                                                "
                                            >
                                                 {deleting ? "Deleting..." : "Confirm Delete"}
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}
                {showDeleteModal && (
                    <div className="
                        fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4
                 ">

                    <div className="
                         w-full max-w-md rounded-xl bg-white p-6 shadow-xl
                     ">

                     <h3 className="
                         text-xl
                        font-bold
                        text-gray-800
                    ">
                     Delete Student?
                     </h3>


                    <p className="
                     mt-3 text-gray-600
                    ">
                     Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-800">
                    {studentToDelete?.name}
                </span>
                ?
            </p>


            <p className="
                mt-2 text-sm text-red-500
            ">
                This action cannot be undone.
            </p>


            <div className="
                mt-6 flex justify-end gap-3
            ">

                <button
                    onClick={cancelDelete}
                    className="
                        px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition
                    "
                >
                    Cancel
                </button>


                <button
                    onClick={confirmDelete}
                    className="
                        px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition
                    "
                >
                    Confirm Delete
                </button>

            </div>

        </div>

    </div>
)}

            </div>

        </section>
    );
}


export default StudentList;