import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/searchBar";
import LatestNotes from "../components/LatestNotes";
import FilterBar from "../components/FilterBar";

import { useState } from "react";
import notes from "../data/notes";

const Home = () => {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [standard, setStandard] = useState("");

  const filteredNotes = notes.filter((note) => {
    const searchText = search.toLowerCase();

    // Search filter
    const matchesSearch =
      note.title.toLowerCase().includes(searchText) ||
      note.subject.toLowerCase().includes(searchText) ||
      note.standard.toLowerCase().includes(searchText);

    // Subject filter
    const matchesSubject =
      subject === "" || note.subject === subject;

    // Standard filter
    const matchesStandard =
      standard === "" || note.standard === standard;

    return matchesSearch && matchesSubject && matchesStandard;
  });

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
        standard={standard}
        setStandard={setStandard}
      />

      {filteredNotes.length > 0 ? (
        <LatestNotes notes={filteredNotes} />
      ) : (
        <div className="no-results text-center px-2 py-2 ">
          <h2>No notes found</h2>
          <p>Try a different search or filter.</p>
        </div>
      )}
    </>
  );
};

export default Home;