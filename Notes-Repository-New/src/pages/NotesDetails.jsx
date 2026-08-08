import Navbar from "../components/navbar";
import {Link , useParams} from "react-router-dom";
import notes from "../data/notes";
import NoteCard from "../components/noteCard";

function NotesDetails() {
  const { id } = useParams();

  const note = notes.find(
    (note) => note.id === Number(id)
  );

  if (!note) {
    return (
      <>
        <Navbar />

        <div className="max-w-4xl mx-auto px-5 py-10">
          <h1 className="text-2xl font-bold">
            Note Not Found
          </h1>

          <Link
            to="/notes"
            className="text-blue-600 hover:underline"
          >
            ← Back to Notes
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-5 py-8">
        <Link
          to="/notes"
          className="text-blue-600 hover:underline"
        >
          ← Back to Notes
        </Link>
        
        <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
            <h1 className="text-3xl font-bold text-gray-800 ">
                📄 {note.title}
            </h1>

            <div className="mt-6 space-y-4">
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
                        Standard
                    </h2>
                    <p className="text-lg text-gray-700">
                        {note.standard}
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

            <div className="mt-8">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-6">
                    Download
                </button>
            </div>
        </div>

        
      </main>
    </>
  );
}

export default NotesDetails;