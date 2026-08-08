import Navbar from "../components/navbar";
import NoteCard from "../components/noteCard";
import notes from "../data/notes";

function Notes() {
  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-5 py-7">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          All Notes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              subject={note.subject}
              standard={note.standard}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Notes;