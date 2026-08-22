import Navbar from "../components/navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function NotesDetails() {

  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ========================================
  // FETCH SINGLE NOTE
  // ========================================

  useEffect(() => {

    const fetchNote = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login first");
        }

        const response = await fetch(
          `http://localhost:5000/api/notes/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log("SINGLE NOTE API:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch note"
          );
        }

        setNote(data.note);

      } catch (error) {

        console.error("FETCH SINGLE NOTE ERROR:", error);

        setError(error.message);

      } finally {

        setLoading(false);

      }

    };

    fetchNote();

  }, [id]);


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="max-w-4xl mx-auto px-5 py-10">

          <p className="text-gray-600">
            Loading note...
          </p>

        </div>
      </>
    );
  }


  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <>
        <Navbar />

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


  // ========================================
  // NOTE DETAILS
  // ========================================

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-5 py-8">

        {/* Back */}

        <Link
          to="/notes"
          className="text-blue-600 hover:underline"
        >
          ← Back to Notes
        </Link>


        {/* Note */}

        <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">

          {/* Title */}

          <h1 className="text-3xl font-bold text-gray-800">
            📄 {note.title}
          </h1>


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
                Semester
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

          </div>


          {/* Buttons */}

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