import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import NoteCard from "../components/noteCard";

function Notes() {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {

    const fetchNotes = async () => {

      try {

        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        if (!token) {
          setErrorMessage("Please login first");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/notes",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("STATUS:", response.status);

        const data = await response.json();

        console.log("API RESPONSE:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch notes"
          );
        }

        setNotes(data.notes);

      } catch (error) {

        console.error("FETCH NOTES ERROR:", error);

        setErrorMessage(error.message);

      } finally {

        setLoading(false);

      }
    };

    fetchNotes();

  }, []);


  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-5 py-7">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          All Notes
        </h1>


        {/* Loading */}

        {loading && (
          <p className="text-gray-600">
            Loading notes...
          </p>
        )}


        {/* Error */}

        {errorMessage && (
          <p className="text-red-500">
            {errorMessage}
          </p>
        )}


        {/* No notes */}

        {!loading &&
          !errorMessage &&
          notes.length === 0 && (
            <p className="text-gray-600">
              No notes available.
            </p>
          )
        }


        {/* Notes */}

        {!loading &&
          !errorMessage &&
          notes.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {notes.map((note) => (

                <NoteCard
                  key={note._id}
                  id={note._id}
                  title={note.title}
                  subject={note.subject}
                  description={note.description}
                  semester={note.semester}
                  branch={note.branch}
                />

              ))}

            </div>

          )}

      </section>
    </>
  );
}

export default Notes;