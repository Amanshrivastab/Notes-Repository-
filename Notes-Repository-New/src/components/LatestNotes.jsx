import NoteCard from "./noteCard";

const LatestNotes = ({ notes }) => {

  const latestNotes = notes.slice(0, 6);

  return (
    <section className="max-w-6xl mx-auto px-5 py-7">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Latest Notes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {latestNotes.map((note) => (

          <NoteCard
            key={note._id}
            id={note._id}
            title={note.title}
            description={note.description}
            subject={note.subject}
            semester={note.semester}
            branch={note.branch}
          />

        ))}

      </div>

    </section>
  );
};

export default LatestNotes;