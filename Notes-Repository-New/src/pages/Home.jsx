import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/searchBar";
import LatestNotes from "../components/LatestNotes";
import FilterBar from "../components/FilterBar";

import { useEffect, useState } from "react";

import { fetchNotes } from "../utils/notesApi";
import { filterNotes } from "../utils/noteFilter";


const Home = () => {

    const [notes, setNotes] = useState([]);

    const [search, setSearch] = useState("");

    const [subject, setSubject] = useState("");

    const [semester, setSemester] = useState("");

    const [branch, setBranch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ========================================
    // FETCH NOTES
    // ========================================

    useEffect(() => {

        const loadNotes = async () => {

            try {

                const notesData = await fetchNotes();

                setNotes(notesData);

            } catch (err) {

                console.error("HOME FETCH ERROR:", err);

                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        loadNotes();

    }, []);


    // ========================================
    // FILTER NOTES
    // ========================================

    const filteredNotes = filterNotes(
        notes,
        search,
        subject,
        semester,
        branch
    );


    return (
        <>
            <Navbar />

            <HeroSection />

            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <FilterBar
                subject={subject}
                setSubject={setSubject}
                semester={semester}
                setSemester={setSemester}
                branch={branch}
                setBranch={setBranch}
            />


            {/* Loading */}

            {loading && (
                <div className="text-center py-10">
                    <p className="text-gray-600">
                        Loading latest notes...
                    </p>
                </div>
            )}


            {/* Error */}

            {!loading && error && (
                <div className="text-center py-10">
                    <p className="text-red-500">
                        {error}
                    </p>
                </div>
            )}


            {/* Latest Notes */}

            {!loading &&
                !error &&
                filteredNotes.length > 0 && (

                    <LatestNotes
                        notes={filteredNotes}
                    />

                )
            }


            {/* No Results */}

            {!loading &&
                !error &&
                filteredNotes.length === 0 && (

                    <div className="text-center px-2 py-10">

                        <h2 className="text-xl font-semibold">
                            No notes found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try a different search or filter.
                        </p>

                    </div>

                )
            }

        </>
    );
};

export default Home;