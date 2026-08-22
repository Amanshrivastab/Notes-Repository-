import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/searchBar";
import LatestNotes from "../components/LatestNotes";
import FilterBar from "../components/FilterBar";

import { useEffect, useState } from "react";


const Home = () => {

  const [notes , setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [standard, setStandard] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   // ========================================
  // FETCH NOTES FROM BACKEND
  // ========================================
  useEffect(()=>{
    const fetchNotes = async()=>{

      try{
        const token = localStorage.getItem("token");

        const response = await fetch(
           "http://localhost:5000/api/notes",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();
        console.log("HOME API RSPONSE",data);

        if(!response.ok){
          throw new error(
            data.message||"failed to fetch notes"
          )
        }
        setNotes(data.notes);
      }catch(err){
        console.error("HOME FETCH ERROR",err);
        setError(err.message);
      }finally{
        setLoading(false);
      }
    };
    fetchNotes();
  },[]);

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