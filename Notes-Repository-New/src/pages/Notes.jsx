import { useState } from "react";
import Navbar from "../components/navbar";
import NoteCard from "../components/noteCard";
import SearchBar from "../components/searchBar";
import FilterBar from "../components/FilterBar";
import useNotes from "../hooks/useNotes";

function Notes() {
    const [search, setSearch] = useState("");
    const [subject, setSubject] = useState("");
    const [level, setLevel] = useState("");       // "school" | "btech"
    const [standard, setStandard] = useState(""); // maps to semester (1-8 or 9-12)
    const [branch, setBranch] = useState("");      // CSE/ECE/BT or Science/Commerce/Arts

    const {
        notes,
        loading,
        error
    } = useNotes({ search, subject, semester: standard, branch });

    return (
        <>
            <Navbar />

            <section className="max-w-6xl mx-auto px-5 py-7">

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    All Notes
                </h1>

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                />

                <FilterBar
                    subject={subject}
                    setSubject={setSubject}
                    level={level}
                    setLevel={setLevel}
                    standard={standard}
                    setStandard={setStandard}
                    branch={branch}
                    setBranch={setBranch}
                />

                {loading && (
                    <p className="text-gray-600">
                        Loading notes...
                    </p>
                )}

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                {!loading &&
                    !error &&
                    notes.length === 0 && (
                        <p className="text-gray-600">
                            No notes available.
                        </p>
                    )
                }

                {!loading &&
                    !error &&
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
                    )
                }

            </section>
        </>
    );
}

export default Notes;