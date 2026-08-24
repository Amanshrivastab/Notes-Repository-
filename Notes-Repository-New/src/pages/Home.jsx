import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/searchBar";
import LatestNotes from "../components/LatestNotes";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

import useLatestNotes from "../hooks/useLatestNotes";
import { filterNotes } from "../utils/noteFilter";

const Home = () => {

    const [search, setSearch] = useState("");
    const [subject, setSubject] = useState("");
    const [level, setLevel] = useState("");       // "school" | "btech"
    const [standard, setStandard] = useState(""); // class number (9-12) ya semester (1-8)
    const [branch, setBranch] = useState("");      // branch (CSE/ECE/BT) ya stream (Science/Commerce/Arts)

    const {
        notes,
        loading,
        error
    } = useLatestNotes();

    // ========================================
    // FILTER NOTES
    // ========================================

    const filteredNotes = filterNotes(
        notes,
        search,
        subject,
        branch,
        standard   // ye function ke andar "semester" parameter mein jaata hai
    );

    return (
        <>
           

            <HeroSection />

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

            {/* Loading */}
            {loading && (
                <div className="text-center py-10">
                    <p className="text-gray-600">Loading latest notes...</p>
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="text-center py-10">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {/* Latest Notes */}
            {!loading && !error && filteredNotes.length > 0 && (
                <LatestNotes notes={filteredNotes} />
            )}

            {/* No Results */}
            {!loading && !error && filteredNotes.length === 0 && (
                <div className="text-center px-2 py-10">
                    <h2 className="text-xl font-semibold">No notes found</h2>
                    <p className="text-gray-500 mt-2">Try a different search or filter.</p>
                </div>
            )}

        </>
    );
};

export default Home;