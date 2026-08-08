import { useState } from "react";

const SearchBar = ({search , setSearch} ) => {
   

   
    return (
        <section className="max-w-7xl mx-auto mt-2 mb-2 py-3">
            <div className="flex flex-col md:flex-row  gap-4">
                <input 
                type="text"
                placeholder="Search Notes..."
                value={search}
                onChange={(e)=>  setSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">

                </input>
                <button
              
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Search
                </button>

            </div>
        </section>
    );
};

export default SearchBar;